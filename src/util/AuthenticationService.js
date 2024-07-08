import axios from "axios";
import { notifyError } from "./Util";
import { redirect, useNavigate } from "react-router-dom";

export const TOKEN_SESSION_ATTRIBUTE_NAME = "token";
export const EXPIRATION_SESSION_ATTRIBUTE_NAME = "expiration";
export const USERNAME_SESSION_ATTRIBUTE_NAME = "username";
export const USERID_SESSION_ATTRIBUTE_NAME = "id";

export const registerSuccessfulLoginForJwt = (username, token, expiration) => {
  localStorage.setItem(USERNAME_SESSION_ATTRIBUTE_NAME, username);
  localStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token);
  localStorage.setItem(EXPIRATION_SESSION_ATTRIBUTE_NAME, expiration);

  // Infelizmente, tenho que passar o id do usuário de forma insegura por aqui
  getUserId().then(
    id => {
      localStorage.setItem(USERID_SESSION_ATTRIBUTE_NAME, id);
      setupAxiosInterceptors();
    }
  )

  //setupAxiosInterceptors();
};

export const setupAxiosInterceptors = () => {
  let token = createJWTToken(
    localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
  );

  if (isUserLoggedIn()) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const createJWTToken = (token) => {
  return "Bearer " + token;
};

export const logout = () => {
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
  const navigate = useNavigate();
  navigate(0);
  /* redirect("/"); */
};

export const isTokenExpired = () => {
  let expiration = localStorage.getItem(EXPIRATION_SESSION_ATTRIBUTE_NAME);
  return expiration === null || expiration < new Date().getTime();
};

export const isUserLoggedIn = () => {
  let user = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);

  if (user === null) {
    return false;
  } else {
    return true;
  }
};

export const getToken = () => {
  let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
  if (token === null) return "";
  return token;
};

export const getUserId = () => {
  let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
  let username = localStorage.getItem(USERNAME_SESSION_ATTRIBUTE_NAME);
  let userid = 0;
  if (token === null) return "";
  return axios
    .get(`/api/usuario/u/${username}`)
    .then((res) => {
      //userid = res.data;
      //console.log(userid)
      //localStorage.setItem(USERID_SESSION_ATTRIBUTE_NAME, res.data);
      return res.data; //userid;
    })
    .catch((error) => {
      notifyError("Usuário inválido. Falha na busca.");
      return error; // userid;
    });
  return "fail";
};
