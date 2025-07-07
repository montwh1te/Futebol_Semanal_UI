import { api } from "./api";

export const login = async (email: string, senha: string) => {
  const res = await api.post("/Usuarios/login", { email, senha });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const register = async (nome: string, email: string, senha: string, telefone: string) => {
  return api.post("/Usuarios/register", { nome, email, senha, telefone });
};

export const logout = () => {
  localStorage.removeItem("token");
};