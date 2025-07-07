import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { getUserIdFromToken } from "../../services/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, senha);

    const userId = getUserIdFromToken();
    if (!userId) return;

    navigate(`/profile/${userId}`);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111814] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Faça seu login no Futebol Semanal
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 rounded-xl w-full max-w-2xl mx-auto">
              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Insira seu email"
                    required
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293830] focus:border-none h-14 placeholder:text-[#9db8ab] p-4 text-base font-normal leading-normal"
                  />
                </label>
              </div>

              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">Senha</p>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Insira sua senha"
                    required
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293830] focus:border-none h-14 placeholder:text-[#9db8ab] p-4 text-base font-normal leading-normal"
                  />
                </label>
              </div>

              <div className="flex px-4 py-3">
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#19e57f] text-[#111814] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Login</span>
                </button>
              </div>
            </form>

            <Link to="/register" className="truncate">
              <p className="text-[#9db8ab] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
                Ainda não possui uma conta? Registre-se
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
