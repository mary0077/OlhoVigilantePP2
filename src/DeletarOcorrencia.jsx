import axios from "axios";
import { notifyError, notifySuccess } from "./util/Util";

const DeletarOcorrencia = ({ idOcorr, ocorrs, setOcorrList, usuario }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    //console.log(ocorrs[0].usuario.id)
    /* console.log("Stored id: ", localStorage.id, "\n User id: ", usuario.id); */
    let url = `/api/ocorrencia/${idOcorr}`;
    axios
      .delete(url)
      .then((res) => {
        notifySuccess("Ocorrência apagada com sucesso");
        let ocorrsList = ocorrs.filter((elem) => elem.id !== idOcorr);
        setOcorrList(ocorrsList);
      })
      .catch((err) => notifyError("Erro ao apagar a ocorrência"));
  };
  return (
    parseInt(localStorage.id) === usuario.id && (
      <button
        className="w-5 h-[1.4em] bg-trash-icon hover:bg-trash-hover-icon"
        onClick={handleClick}
      ></button>
    )
  );
};
export default DeletarOcorrencia;
