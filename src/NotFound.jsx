import { Link } from "react-router-dom";
import Header from "./components/Header/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col h-[100vh] items-center justify-center">
        <h1 className="font-sora text-[42px] self-center">
          Página não encontrada
        </h1>
        <Link
          className="px-8 py-3 rounded-lg text-white font-rubik font-500 mt-6 bg-blue-500"
          to="/"
        >
          Ir para o inicio
        </Link>
      </main>
    </>
  );
};

export default NotFound;
