import "./index.css"; // Certifique-se de importar o arquivo CSS correspondente
import Rotas from "./Rotas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "leaflet/dist/leaflet.css";
import "@geoapify/leaflet-address-search-plugin/dist/L.Control.GeoapifyAddressSearch.min.css"

function App() {
  return (
    <>
      <ToastContainer />
      <Rotas />
    </>
  );
}

export default App;
