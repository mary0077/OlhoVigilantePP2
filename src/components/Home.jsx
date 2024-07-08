import React from "react";
import Header from "./Header/Header";
import { Footer } from "../Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        {/* Barra de Navegação */}
        <div className="">
          {/* Banner */}
          <div
            className={`bg-right bg-[url(/olho.png)] w-full bg-cover flex items-center bg-no-repeat h-[700px]`}
          >
            <div className="container">
              <div className="container">
                <div className="container">
                  <p className="text-sky w-[670px] text-[35px] font-bold pt-[10px] pb-3">
                    No Olho Vigilante, proporcionamos uma experiência intuitiva
                    e eficiente para conduzir pesquisas relacionadas a
                    incidentes, estatísticas e informações relevantes. Nossa
                    plataforma robusta permite que os usuários realizem
                    pesquisas abrangentes, filtrando dados específicos e obtendo
                    insights valiosos para melhor compreensão e consciência da
                    segurança em suas comunidades.
                  </p>

                  <a href="/cadastro">
                    <button className="bg-black text-white font-bold py-5 px-9 flex items-center rounded">
                      CADASTRE-SE
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={`bg-sky-950 pt-[70px] pb-1`}>
          <div className="container">
            <p className="text-white w-[599px] text-left text-[35px] font-bold pb-4">
              Como Podemos te Ajudar?
            </p>
            <p className="text-white w-[599px] text-left text-[20px] pb-10">
              Cada uma das opções abaixo abre um leque de informações para
              melhorar sua experiência.
            </p>

            <div className="flex gap-1 h-[170px] justify-evenly">
              <div>
                <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
                  INÍCIO
                </button>
              </div>

              <div>
                <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
                  COLABOARAÇÃO
                </button>
              </div>

              <div>
                <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
                  OCORRÊNCIAS
                </button>
              </div>

              <div>
                <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
                  COMUNIDADE
                </button>
              </div>

              <div>
                <button className="bg-white text-black font-bold py-2 px-4 rounded w-[200px] h-[116px]">
                  FALAR CONOSCO
                </button>
              </div>
            </div>
          </div>
        </div> */}
        <Footer />
        </div>
    </>
  );
};

export default Home;
