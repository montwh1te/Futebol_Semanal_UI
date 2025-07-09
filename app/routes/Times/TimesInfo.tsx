import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import Header from "../../components/Header";

const TodosTimes = () => {
  const { usuarioId } = useParams();
  const navigate = useNavigate();
  const [equipes, setEquipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipes = async () => {
      try {
        const response = await api.get("/Times");
        const timesFiltrados = response.data.filter(
          (time: any) => time.usuarioId === Number(usuarioId)
        );
        setEquipes(timesFiltrados);
      } catch (error) {
        console.error("Erro ao carregar equipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipes();
  }, [usuarioId]);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111814] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
              Times
            </p>
            <button
              onClick={() => navigate(`/${usuarioId}/times/criar-time`)}
              className="h-10 px-4 bg-[#10cf6f] text-[#111814] rounded-full text-sm font-semibold hover:bg-[#0db561] transition"
            >
              Criar Time
            </button>
          </div>

            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#3b5447] bg-[#111814]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-[#1c2721]">
                      <th className="px-4 py-3 text-left text-white w-14 text-sm font-medium">Logo</th>
                      <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium">Nome</th>
                      <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-4 text-white text-sm">
                          Carregando times...
                        </td>
                      </tr>
                    ) : equipes.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-4 text-white text-sm">
                          Nenhuma equipe encontrada.
                        </td>
                      </tr>
                    ) : (
                      equipes.map((equipe, index) => (
                        <tr
                          key={index}
                          className="border-t border-t-[#3b5447] cursor-pointer hover:bg-[#1c2721]/50 transition"
                          onClick={() => navigate(`${equipe.id}`)}
                        >
                          <td className="h-[72px] px-4 py-2 w-14 text-sm">
                            <div
                              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
                              style={{
                                backgroundImage: `url('${equipe.fotoUrl}')`,
                              }}
                            ></div>
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm">
                            {equipe.nome}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#9db9aa] text-sm">
                            {equipe.estado}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <style>{`
              @container (max-width: 56px) {
                .w-14 { display: none; }
              }
              @container (max-width: 176px) {
                .w-[400px] { display: none; }
              }
              @container (max-width: 296px) {
                .w-[400px] { display: none; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosTimes;
