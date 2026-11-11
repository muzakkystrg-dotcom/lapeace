import { setGlobalDispatcher, Agent } from "undici";
import { stitch } from "@google/stitch-sdk";

// Increase undici connect timeout from 10s to 60s
setGlobalDispatcher(new Agent({
  connect: {
    timeout: 60_000
  }
}));

async function main() {
  console.log("Connecting to Stitch with API Key...");
  const apiKey = process.env.STITCH_API_KEY;
  console.log("API Key loaded (length):", apiKey ? apiKey.length : 0);

  try {
    const projects = await stitch.projects();
    console.log(`Success! Found ${projects.length} project(s):`);
    for (const p of projects) {
      console.log(`- Project ID: ${p.id || p.projectId}`);
      try {
        const screens = await p.screens();
        console.log(`  Screens (${screens.length}):`);
        for (const s of screens) {
          console.log(`    * Screen ID: ${s.id || s.screenId}, Title: ${s.title || 'Untitled'}`);
        }
      } catch (err) {
        console.log(`  Screens fetch note: ${err.message}`);
      }
    }
  } catch (error) {
    console.error("Error communicating with Stitch API:", error);
  }
}

main();
