import { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Submit clicado!");
    try {
      await register(nome, email, senha, telefone);
      alert("Registro feito");
      navigate("/login");
    } catch (error) {
      alert("Erro no registro");
      console.error(error);
    }
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
              Entre para a comunidade do Futebol Semanal
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-8 rounded-xl w-full max-w-2xl mx-auto">
              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283930] focus:border-none h-14 placeholder:text-[#9db9ab] p-4 text-base font-normal leading-normal"
                    required
                  />
                </label>
              </div>

              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283930] focus:border-none h-14 placeholder:text-[#9db9ab] p-4 text-base font-normal leading-normal"
                    required
                  />
                </label>
              </div>

              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283930] focus:border-none h-14 placeholder:text-[#9db9ab] p-4 text-base font-normal leading-normal"
                    required
                  />
                </label>
              </div>

              <div className="flex w-full max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    placeholder="Número de Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283930] focus:border-none h-14 placeholder:text-[#9db9ab] p-4 text-base font-normal leading-normal"
                    required
                  />
                </label>
              </div>

              <div className="flex px-4 py-3">
                <button
                  type="submit"
                  className="flex min-w-[84px] max-w-[480px] mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#11d472] text-[#111814] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Registrar</span>
                </button>
              </div>
            </form>

            <p className="text-[#9db9ab] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Após conclusão do registro, você concorda com nossos Termos de Serviço e Política de Privacidade
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
