QuickConvert
QuickConvert is an online image converter application that enables users to convert images from one format to another directly in the browser, without requiring any server-side processing. Inspired by applications like CloudConvert, QuickConvert leverages WebAssembly (WASM) to integrate FFmpeg, a high-performance multimedia framework, allowing users to convert images locally and securely on their own devices.

Project Overview
QuickConvert is designed as a hands-on project to help developers apply web development and multimedia processing concepts. Unlike structured assignments, this project challenges users to build a functioning application from near-scratch, with minimal starter code. This application focuses on converting images between formats like JPEG, PNG, and WebP.

Key Features
Drag-and-Drop Functionality: Users can drag and drop or manually select multiple files to convert.
Local Processing: All image conversions happen in the browser using WebAssembly, which allows the application to handle high performance without needing a server.
Image Format Support: QuickConvert supports JPEG, PNG, and WebP formats.
File Management: Users can add multiple files to the list, rename files, select the desired output format, and view file size before and after conversion.
Downloadable Output: After conversion, users can download their files directly from the browser.
Technologies Used
React: For building a dynamic user interface.
FFmpeg: A multimedia framework used for encoding, decoding, and converting images.
WebAssembly (WASM): Enables high-performance FFmpeg processing in the browser.
React-Dropzone: Provides drag-and-drop file upload functionality.
Getting Started
Prerequisites
Node.js and npm installed on your machine.
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/<your-username>/QuickConvert.git
cd QuickConvert
Install Dependencies

bash
Copy code
npm install
Run the Application

bash
Copy code
npm start
Open in Browser Open http://localhost:3000 to view it in your browser.

Usage
Adding Files: Drag and drop images into the dropzone area or use the file selector. Files will be displayed in a list with their names and sizes.
Selecting Output Format: Choose the desired format for each file (JPEG, PNG, or WebP).
Converting Files: Click the "Convert" button to start the conversion. A loading spinner will appear while the conversion is in progress.
Downloading: After the conversion is complete, click the download button to save the converted file.
Code Snippets
Below is an example of how the FFmpeg WebAssembly code is loaded:

javascript
Copy code
import { useEffect, useRef } from "react";

// FFmpeg ref for accessing the FFmpeg instance
const ffmpegRef = useRef(null);

useEffect(() => {
  loadFFmpeg();
}, []);

const loadFFmpeg = async () => {
  const ffmpegInstance = await loadFfmpeg();
  ffmpegRef.current = ffmpegInstance;
};
File Conversion
The convertFile function, provided in utils.ts, takes in the file, FFmpeg ref, and output format to perform the conversion. It returns a Blob URL of the converted file, which can be downloaded by the user.

javascript
Copy code
const convertFile = async (file, ffmpegRef, outputFormat) => {
  await ffmpegRef.current.writeFile(file.name, await fetchFile(file));
  await ffmpegRef.current.run("-i", file.name, `output.${outputFormat}`);
  const data = await ffmpegRef.current.readFile(`output.${outputFormat}`);
  return new Blob([data], { type: `image/${outputFormat}` });
};
Project Requirements
File Input and Display:
Users can add, view, and manage multiple files for conversion.
Both file name and size should be displayed.
Users can remove files from the list.
File Conversion:
Users can select an output format and rename files before converting.
A loading indicator is shown during conversion.
Converted files are downloadable, with updated names and formats.
File Size Display:
After conversion, the size of the new file is displayed.
Tips
Start Simple: Begin with implementing single-file conversion, then expand to handle multiple files.
Data Pipeline: Files are processed locally in the browser, avoiding server load.
FFmpeg Setup: The WebAssembly build of FFmpeg enables smooth, fast, and efficient image processing.
