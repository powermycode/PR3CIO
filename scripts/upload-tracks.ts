import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const TRACKS_DIR =
  "/Users/arunrachuri/Downloads/wetransfer_nani-ojz-2-17-23-mp3_2026-03-31_0248";
const API_URL = "http://localhost:3000/api/upload";

const tracks = [
  {
    file: "Nastar El Patron Ft Railosky - Ta Dura (Prod.By F1 El Control).mp3",
    title: "Ta Dura",
    genre: "Hip Hop",
  },
  {
    file: "MUSE'S REVENGE - NANI .m4a",
    title: "Muse's Revenge",
    genre: "RnB",
  },
  {
    file: "LESJ - ELITE - NENO MASTER.m4a",
    title: "Neno",
    genre: "Hip Hop",
  },
  { file: "Nani Ojz 2.17.23.mp3", title: "Ojz", genre: "RnB" },
  {
    file: "Derecho De Paso_Rome_Feb16th.mp3",
    title: "Derecho De Paso",
    genre: "Hip Hop",
  },
];

async function uploadTrack(
  filePath: string,
  title: string,
  genre: string,
): Promise<void> {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);

  const formData = new FormData();
  const blob = new Blob([fileBuffer], { type: "audio/mpeg" });
  formData.append("audioFile", blob, fileName);

  console.log(`Uploading: ${fileName}...`);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      console.log(
        `  ✓ Uploaded: ${title} (${result.title} by ${result.artist})`,
      );
    } else {
      console.log(`  ✗ Failed: ${result.error}`);
    }
  } catch (error) {
    console.log(
      `  ✗ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

async function main() {
  for (const track of tracks) {
    const filePath = path.join(TRACKS_DIR, track.file);
    if (fs.existsSync(filePath)) {
      await uploadTrack(filePath, track.title, track.genre);
    } else {
      console.log(`File not found: ${filePath}`);
    }
  }
  console.log("\nDone!");
}

main();
