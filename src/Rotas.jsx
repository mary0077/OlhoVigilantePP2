import { Route, Routes } from "react-router-dom";
import Cadastro from "./components/Login/Register/Register";
import NotFound from "./NotFound";
import Home from "./components/Home";
import Ocorrencia from "./Ocorrencia";
import Login from "./components/Login/Register/Login";
import Perfil from "./components/Perfil/Perfil";
import MapDemo from "./MapDemo";
import NewMap from "./NewMap";
import GeoapifyMap from "./GeoapifyMap";
import { ProtectedRoute } from "./util/ProtectedRoute";
import { LoggedInRouting } from "./util/LoggedInRouting";
import Comunidade from "./Comunidade";
import FileUploader from "./util/FileUploader";
import DropZone from "./util/DropZone";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="login"
          element={
            <LoggedInRouting>
              <Login />
            </LoggedInRouting>
          }
        />
        <Route
          path="cadastro"
          element={
            <LoggedInRouting>
              <Cadastro />
            </LoggedInRouting>
          }
        />
        <Route path="ocorrencia" element={<Ocorrencia />} />
        <Route
          path="perfil"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route path="mapdemo" element={<GeoapifyMap />} />
        <Route path="comunidade" element={<Comunidade />} />
        <Route path="uploader" element={<DropZone />} />
        <Route path="*" element={<NotFound />} /> {/* Página 404 */}
      </Routes>
    </>
  );
}

export default Rotas;
