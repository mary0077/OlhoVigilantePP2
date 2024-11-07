import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, redirect, Navigate } from "react-router-dom";
import logo from "/mini-logo.png";
import { isUserLoggedIn, logout } from "../../util/AuthenticationService";

const navMenuItems = [
  {
    icon: "/icon-inicio.svg",
    text: "Início",
    link: "inicio",
  },
  {
    icon: "/icon-ocorrencias.svg",
    text: "Ocorrências",
    link: "ocorrencia",
  },
  {
    icon: "/icon-comunidade.svg",
    text: "Comunidade",
    link: "comunidade",
  },
  /* {
    icon: "/icon-megaphone2.svg",
    text: "Onde Denunciar",
    link: "/denunciar",
  }, */
];
const navUserBtns = [
  {
    icon: "/icon-usuario.svg",
    text: "Perfil",
    link: "perfil",
    loggedOnly: true,
  },
  {
    icon: "/btn-entrar.svg",
    //text: "",
    link: "/login",
    loggedOnly: false,
  },
  {
    icon: "/btn-cadastrar.svg",
    // text: "",
    link: "/cadastro",
    loggedOnly: false,
  },
  {
    icon: "/icon-logout.svg",
    text: "Sair",
    //link: "/logout",
    loggedOnly: true,
    //onClick: () => logout(),
  },
];
const icons = {
  perfil: "/icon-usuario.svg",
  login: "/btn-entrar.svg",
  cadastro: "/btn-cadastrar.svg",
  sair: "/icon-logout.svg",
};

const Header = () => {
  const [activeUrl, setActiveUrl] = useState("");
  const [userState, setUserState] = useState(isUserLoggedIn());
  const location = useLocation();

  const handleLogout = () => {
    //userState(!userState);
    logout();
    //<Navigate to={"/"} />
    redirect("/");
  };

  const isUrlActive = ({ link }) => {
    return activeUrl === link;
  };

  useEffect(() => {
    setActiveUrl(location.pathname);
    //setUser({});
  }, [location]);

  return (
    <header className="bg-black text-white">
      <div className="container flex justify-between items-center flex-wrap">
        <Link to="/">
          <img src={logo} alt="" className="minilogo mt-1" />
        </Link>

        {/* MENU DESKTOP */}
        <nav className="max-lg:hidden">
          <ul className="menu flex items-center gap-12">
            {navMenuItems.map((elem) => (
              <li key={elem.icon.slice(5, -4)}>
                <Link
                  to={elem.link}
                  className="flex font-sora text-white flex-col"
                >
                  <img
                    src={
                      /* activeUrl == elem.link */
                      isUrlActive(elem)
                        ? elem.icon.slice(0, -4) + "/-active.svg"
                        : elem.icon
                    }
                    alt=""
                    className="self-center w-8 h-8"
                  />
                  <p>{elem.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {
          /* userState */ isUserLoggedIn() && (
            <div className="userButtons flex gap-6">
              {/* <div className="flex"> */}
              <Link
                to={"perfil"}
                className="flex font-sora text-white flex-col"
              >
                <img
                  src={
                    isUrlActive(navUserBtns[0])
                      ? navUserBtns[0].icon.slice(0, -4) + "-active.svg"
                      : navUserBtns[0].icon
                  }
                />
                <p>{navUserBtns[0].text}</p>
              </Link>
              <Link
                //className="flex font-sora text-white flex-col"
                onClick={handleLogout}
              >
                <img src={navUserBtns[3].icon} />
                <p>{navUserBtns[3].text}</p>
              </Link>
              {/* </div> */}
              {/* {navUserBtns.map((elem) => (
            <div key={elem.icon.slice(5, -4)} className="flex">
              {
                userState ? (
                  // Logado
                  elem.loggedIn ? (
                    elem.text === "logout" && (
                      <>
                        <img
                          src={
                            isUrlActive(elem)
                              ? elem.icon.slice(0, -4) + "-active.svg"
                              : elem.icon
                          }
                          onClick={handleLogout}
                        />
                        <p>{elem.text}</p>
                      </>
                    )
                  ) : (
                    ""
                  )
                ) : (
                  // Acrescentar highlights para quando estiver em hover
                  <Link to={elem.link} className="self-center ">                   
                    <img src={elem.icon} alt="" />
                    <p>{elem.text}</p>
                  </Link>
                )
              }
            </div>
          ))} */}
              {/* <Link to="/perfil" className="flex flex-col">
          <img src={icons.perfil} alt="" className="self-center w-8 h-8" />
          <p>Perfil</p>
        </Link> */}
            </div>
          )
        }
        {
          /* !userState */ !isUserLoggedIn() && (
            <div className="userButtons flex gap-6">
              <Link to={navUserBtns[1].link} className="self-center ">
                <img src={navUserBtns[1].icon} alt=""/>
                <p>{navUserBtns[1].text}</p>
              </Link>
              <Link to={navUserBtns[2].link} className="self-center ">
                <img src={navUserBtns[2].icon} alt=""/>
                <p>{navUserBtns[2].text}</p>
              </Link>
            </div>
          )
        }
      </div>
    </header>
  );
};

export default Header;
