import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";

// Initialize once (at the start of your app).
const uploader = Uploader({
    apiKey: import.meta.env.VITE_BYTESCALE_KEY // Get production API keys from Bytescale
});

// Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
const options = {
    multi: true,
    
};

const FileUploader = () => (
    <UploadButton uploader={uploader}
        options={options}
        onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}>
        {({ onClick }) =>
            <button className="border-double border-4 rounded-[6px] p-3 w-full mb-4" onClick={onClick}>
                Carregar fotos e vídeos...
            </button>
        }
    </UploadButton>
);

export default FileUploader;