import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadDropzone } from "react-uploader";
import axios from "axios";
import { useEffect } from "react";

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const uploader = Uploader({
  apiKey: import.meta.env.VITE_BYTESCALE_KEY, // Get production API keys from Bytescale
});

// Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
const options = {
  multi: true,
  //showFinishButton: true,
  //preview: false,
  locale: {
    addAnotherFile: "Adicione outro arquivo...",
    addAnotherImage: "Add another image...",
    cancel: "cancelar",
    "cancelled!": "cancelado",
    continue: "Continuar",
    crop: "Recortar",
    done: "Concluído",
    "error!": "Erro!",
    finish: "Finalizado",
    finishIcon: true,
    image: "Imagem",
    maxFilesReached: "Maximum number of files:",
    maxImagesReached: "Maximum number of images:",
    maxSize: "File size limit:",
    next: "Próximo",
    of: "de",
    orDragDropFile: "...ou arraste e solte um arquivo.",
    orDragDropFiles: "...ou arraste e solte arquivos.",
    orDragDropImage: "...or drag and drop an image.",
    orDragDropImages: "...or drag and drop images.",
    pleaseWait: "Por favor, aguarde...",
    remove: "remover",
    "removed!": "removido",
    skip: "Skip",
    unsupportedFileType: "Tipo de arquivo não suportado.",
    uploadFile: "Carregar um arquivo",
    uploadFiles: "Carregar arquivos",
    uploadImage: "Carregar uma imagem",
    uploadImages: "Carregar imagens",
  },
};

const DropZone = ({ onUpload }) => (
  <>
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={onUpload
        //(files) => console.log("onUpdate: ", files)
        /* (files) =>
          files.map(({ filePath, fileUrl }) => {
            const midiaRequest = {
              ocorrenciaId: response.id,
              midiaUrl: response.fileUrl,
            };
            axios
              .post("http://localhost:8082/api/midia", midiaRequest)
              .then((res) => {
                //console.log(res)
              })
              .catch((err) => console.log("Erro: ", err));
          }) */
        /* files => files.map(
                ({ filePath, fileUrl }) => {
                    console.log('path: ', filePath, 'url: ', fileUrl); // Don't use file path because there is no urlbuilder available for proper handling as of now
                    // setMidiaUrl(fileUrl);
                }) */
        // Alternativa: fazer as requisições na API de midia diretamente por aqui e retornar os valores para componente pai
      }
      /* onComplete={(elem) => console.log("onComplete: ", elem)} */
      width="560px"
      height="260px"
    />
  </>
);

/* const options = {
    // apiKey: "public_12a1yiw7ZpFfdtrHJGCdV1zqPvAq", // This is your API key.
    maxFileCount: 1,
    //showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
    styles: {
        colors: {
            primary: "#377dff"
        }
    }
};

const DropZone = () => (
    <UploadDropzone options={options}
        onUpdate={({ uploadedFiles }) => console.log(uploadedFiles.map(x => x.fileUrl).join("\n"))}
        onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}
        width="600px"
        height="375px" />
) */

export default DropZone;
