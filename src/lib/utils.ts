import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Load FFmpeg
export async function loadFfmpeg(): Promise<FFmpeg> {
  const ffmpeg = new FFmpeg();
  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
  });
  return ffmpeg;
}

// Convert File
export async function convertFile(
  ffmpeg: FFmpeg | null,
  file: File,
  outputFullName: string
) {
  if (!ffmpeg) throw new Error("FFmpeg not loaded");

  const inputFullName = file.name;
  const { extension: outputFormat } = splitExtension(outputFullName);

  await ffmpeg.writeFile(inputFullName, await fetchFile(file));
  await ffmpeg.exec(["-i", inputFullName, outputFullName]);
  
  const data = await ffmpeg.readFile(outputFullName);
  const blob = new Blob([data], { type: `image/${outputFormat}` });
  
  const url = URL.createObjectURL(blob);
  const size = blob.size;

  await Promise.all([
    ffmpeg.deleteFile(inputFullName),
    ffmpeg.deleteFile(outputFullName),
  ]);

  return { outputObjectUrl: url, outputFileSize: size, outputFullName };
}

// Download File
export function downloadFile(objectUrl: string, outputFileName: string) {
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = outputFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(objectUrl);
}

// Function to extract file extension
function splitExtension(outputFullName: string): { extension: string } {
  const lastDotIndex = outputFullName.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return { extension: "" };
  }
  const extension = outputFullName.slice(lastDotIndex + 1);
  return { extension };
}

// Class name merging function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
