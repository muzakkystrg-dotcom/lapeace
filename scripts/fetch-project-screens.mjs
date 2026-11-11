import { setGlobalDispatcher, Agent } from "undici";
import { stitch } from "@google/stitch-sdk";
import fs from "fs/promises";
import path from "path";

setGlobalDispatcher(new Agent({ connect: { timeout: 60_000 } }));

const PROJECT_ID = "1203300965767051979";
const OUT_DIR = path.resolve("./stitch_export");

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  console.log(`Connecting to project ${PROJECT_ID}...`);
  const project = stitch.project(PROJECT_ID);
  
  const screens = await project.screens();
  console.log(`Found ${screens.length} screens. Fetching details...`);
  
  const screensInfo = [];
  
  for (let i = 0; i < screens.length; i++) {
    const s = screens[i];
    const sId = s.id || s.screenId;
    console.log(`[${i + 1}/${screens.length}] Processing screen ${sId}...`);
    
    let html = "";
    let imageUrl = "";
    try {
      html = await s.getHtml();
    } catch (e) {
      console.error(`Failed to get HTML for ${sId}:`, e.message);
    }
    
    try {
      imageUrl = await s.getImage();
    } catch (e) {
      console.error(`Failed to get image for ${sId}:`, e.message);
    }
    
    const info = {
      index: i + 1,
      id: sId,
      title: s.title || `Screen ${i + 1}`,
      htmlLength: html ? html.length : 0,
      imageUrl: imageUrl || ""
    };
    
    screensInfo.push(info);
    
    if (html) {
      await fs.writeFile(path.join(OUT_DIR, `${i + 1}_${sId}.html`), html, "utf-8");
    }
  }
  
  await fs.writeFile(
    path.join(OUT_DIR, "screens-metadata.json"),
    JSON.stringify(screensInfo, null, 2),
    "utf-8"
  );
  
  console.log(`Done! Exported all screens to ${OUT_DIR}`);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
