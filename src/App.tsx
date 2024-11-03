import { useEffect, useRef, useState } from "react";
import { Dropzone } from "./components/Dropzone";
import { loadFfmpeg, convertFile, downloadFile } from "./lib/utils";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState("jpeg"); // Default output format
  const [isLoading, setIsLoading] = useState(false);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  // Load FFmpeg on component mount
  useEffect(() => {
    const load = async () => {
      const ffmpegInstance = await loadFfmpeg();
      ffmpegRef.current = ffmpegInstance;
    };
    load();
  }, []);

  // Convert file function
  const handleConvert = async (file: File) => {
    if (!ffmpegRef.current) {
      alert("FFmpeg is not loaded");
      return;
    }

    const outputFileName = `${file.name.split(".")[0]}.${outputFormat}`;
    setIsLoading(true);

    try {
      const result = await convertFile(ffmpegRef.current, file, outputFileName);
      if (result) {
        downloadFile(result.outputObjectUrl, result.outputFullName);
        alert(`File converted to ${outputFormat} format and downloaded.`);
      }
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to convert the file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen flex-col items-center justify-center">
      <h1 className="p-2 text-3xl">Quick Convert</h1>
      <p className="pb-5">An Online Image Format Converter</p>

      {/* Dropzone for File Input */}
      <Dropzone files={files} setFiles={setFiles} />

      {/* File List and Conversion Options */}
      <div>
        {files.map((file) => (
          <div key={file.name} className="my-2 flex items-center space-x-2">
          <span>{file.name} - {file.size} bytes</span>
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
            </select>
            <button
              type="button"
              onClick={() => handleConvert(file)}
              disabled={isLoading}
              className="rounded bg-blue-500 px-2 py-1 text-white"
            >
              {isLoading ? "Converting..." : "Convert"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
