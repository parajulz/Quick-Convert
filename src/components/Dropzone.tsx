import { ImageMimeTypes } from "@/lib/constants";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const Dropzone: React.FC<DropzoneProps> = ({ files, setFiles }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ImageMimeTypes,
    onDrop: (acceptedFiles: File[]) => {
      console.log("Files dropped:", acceptedFiles);
      setFiles([...files, ...acceptedFiles]); // Update the state with new files
    },
  });

  return (
    <div className="dropzone">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="text-center">Drop files here or click to select files</div>
      </div>
      <div>
        {files.map((file) => (
          <div key={file.name}>
            {file.name} - {file.size} bytes
          </div>
        ))}
      </div>
    </div>
  );
};
