import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";

interface Time {
  id: string;
  nome: string;
  fotoUrl: string;
}

interface Partida {
  id: string;
  local: string;
  dataHora: string;
  condicoesClimaticas: string;
  campeonato: string;
  timeCasaId: string;
  timeVisitanteId: string;
  placarCasa: number;
  placarVisitante: number;
}

const PartidasInfo = () => {
  const navigate = useNavigate();
  const { usuarioId, timeId } = useParams<{ usuarioId: string, timeId: string }>();

  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        // Busca partidas do usuário
        const partidasRes = await api.get(`/Partidas?usuarioId=${usuarioId}`);
        setPartidas(partidasRes.data);

        // Busca times do usuário
        const timesRes = await api.get(`/Times?usuarioId=${usuarioId}`);
        setTimes(timesRes.data);

      } catch (error) {
        console.error("Erro ao buscar partidas e times:", error);
        alert("Erro ao buscar partidas e times.");
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [usuarioId]);

  function getTimeById(id: string) {
    return times.find((t) => t.id === id);
  }

  function handleClickPartida(partidaId: string) {
    navigate(`${partidaId}`);
  }

  function handleCriarPartida() {
    navigate(`/${usuarioId}/times/${timeId}/criar-partida`);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111814] text-white">
        Carregando partidas...
      </div>
    );
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111814] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between items-center gap-3 p-4">
            <div className="flex flex-col min-w-72 gap-2">
              <button
                onClick={() => navigate(-1)}
                className="text-sm font-semibold text-[#a3b2ab] hover:text-white transition w-fit"
              >
                ← Voltar
              </button>
              <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                Partidas
              </p>
            </div>

            <button
              onClick={handleCriarPartida}
              className="rounded-full h-10 px-4 bg-[#10cf6f] text-[#111814] text-sm font-bold hover:bg-[#0da85d]"
            >
              Criar nova partida
            </button>
          </div>


            {partidas.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 p-10 text-white">
                <p>Nenhuma partida encontrada.</p>
                <button
                  onClick={handleCriarPartida}
                  className="rounded bg-green-600 px-4 py-2 font-semibold hover:bg-green-700"
                >
                  Criar nova partida
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 @container">
                <div className="flex overflow-hidden rounded-xl border border-[#3b5447] bg-[#111814]">
                  <table className="flex-1 w-full table-fixed border-collapse">
                    <thead>
                      <tr className="bg-[#1c2721]">
                        <th className="px-4 py-3 text-left text-white w-20 text-sm font-medium leading-normal">
                          Time Casa
                        </th>
                        <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                          Placar
                        </th>
                        <th className="px-4 py-3 text-left text-white w-20 text-sm font-medium leading-normal">
                          Time Visitante
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {partidas.map((partida) => {
                        const timeCasa = getTimeById(partida.timeCasaId);
                        const timeVisitante = getTimeById(partida.timeVisitanteId);

                        return (
                          <tr
                            key={partida.id}
                            className="border-t border-t-[#3b5447] cursor-pointer hover:bg-[#233226]"
                            onClick={() => handleClickPartida(partida.id)}
                          >
                            <td className="h-18 px-4 py-2 text-sm font-normal leading-normal w-20">
                              {timeCasa ? (
                                <div
                                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
                                  style={{ backgroundImage: `url(${timeCasa.fotoUrl})` }}
                                  title={timeCasa.nome}
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                              )}
                            </td>
                            <td className="h-18 px-4 py-2 text-white text-sm font-normal leading-normal w-[400px]">
                              {timeCasa?.nome ?? "Time Casa"}{" "}
                              <span className="font-bold">
                                {partida.placarCasa} x {partida.placarVisitante}
                              </span>{" "}
                              {timeVisitante?.nome ?? "Time Visitante"}
                            </td>
                            <td className="h-18 px-4 py-2 text-sm font-normal leading-normal w-20">
                              {timeVisitante ? (
                                <div
                                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10"
                                  style={{ backgroundImage: `url(${timeVisitante.fotoUrl})` }}
                                  title={timeVisitante.nome}
                                />
                              ) : (
                                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <style>{`
                  @container(max-width:56px){
                    th:nth-child(1), td:nth-child(1) { display: none; }
                  }
                  @container(max-width:176px){
                    th:nth-child(2), td:nth-child(2) { display: none; }
                  }
                  @container(max-width:232px){
                    th:nth-child(3), td:nth-child(3) { display: none; }
                  }
                `}</style>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartidasInfo;