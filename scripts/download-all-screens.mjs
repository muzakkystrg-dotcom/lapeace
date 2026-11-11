import { setGlobalDispatcher, Agent } from "undici";
import { stitch } from "@google/stitch-sdk";
import fs from "fs/promises";
import path from "path";

setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }));

const PROJECT_ID = "1203300965767051979";
const OUT_DIR = path.resolve("./stitch_export");
const API_KEY = process.env.STITCH_API_KEY;

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`Connecting to project ${PROJECT_ID}...`);
  const project = stitch.project(PROJECT_ID);
  
  const screens = await project.screens();
  console.log(`Found ${screens.length} screens. Downloading actual HTML...`);
  
  const screensInfo = [];
  
  for (let i = 0; i < screens.length; i++) {
    const s = screens[i];
    const sId = s.id || s.screenId;
    console.log(`[${i + 1}/${screens.length}] Processing screen ${sId}...`);
    
    let htmlUrl = "";
    let actualHtml = "";
    
    try {
      htmlUrl = await s.getHtml();
      if (htmlUrl && htmlUrl.startsWith("http")) {
        const res = await fetch(htmlUrl, {
          headers: { "X-Goog-Api-Key": API_KEY }
        });
        const json = await res.json();
        actualHtml = json.dataString || JSON.stringify(json);
      }
    } catch (e) {
      console.error(`Failed to get HTML for ${sId}:`, e.message);
    }
    
    const info = {
      index: i + 1,
      id: sId,
      htmlLength: actualHtml ? actualHtml.length : 0,
      title: ""
    };
    
    if (actualHtml) {
      // Quick title extraction
      const match = actualHtml.match(/<title>([^<]+)<\/title>/i);
      info.title = match ? match[1].trim() : `Screen ${i + 1}`;
      await fs.writeFile(path.join(OUT_DIR, `${i + 1}_${sId}.html`), actualHtml, "utf-8");
      console.log(`  -> Title: "${info.title}", size: ${actualHtml.length} bytes`);
    }
    
    screensInfo.push(info);
  }
  
  await fs.writeFile(
    path.join(OUT_DIR, "screens-metadata.json"),
    JSON.stringify(screensInfo, null, 2),
    "utf-8"
  );
  
  console.log(`\nAll screens downloaded successfully!`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
