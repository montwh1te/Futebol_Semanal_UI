import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";

interface Estatistica {
  id: number;
  jogadorId: number;
  gols?: number;
  assistencias?: number;
  faltas?: number;
  cartoesAmarelos?: number;
  cartoesVermelhos?: number;
  minutosEmCampo?: number;
  jogador?: {
    nome: string;
    imagemUrl?: string;
  };
}

interface Jogador {
  id: number;
  nome: string;
  imagemUrl?: string;
}

interface Partida {
  dataHora: string;
  local: string;
  placarCasa: number;
  placarVisitante: number;
  timeCasa: { nome: string };
  timeVisitante: { nome: string };
}

const EstatisticasPartida = () => {
  const navigate = useNavigate();
  const { usuarioId, timeId, partidaId } = useParams();

  const [estatisticas, setEstatisticas] = useState<Estatistica[]>([]);
  const [partida, setPartida] = useState<Partida | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstatisticas = async () => {
      try {
        const partidaRes = await api.get(`/Partidas/${partidaId}`);
        setPartida(partidaRes.data);

        const estatsRes = await api.get(`/Estatisticas?partidaId=${partidaId}`);
        const estats: Estatistica[] = estatsRes.data;

        const jogadorIds = Array.from(new Set(estats.map(e => e.jogadorId)));
        const jogadoresRes = await Promise.all(
          jogadorIds.map(id => api.get(`/Jogadores/${id}`))
        );
        const jogadoresMap = new Map<number, Jogador>();
        jogadoresRes.forEach(res => {
          const j = res.data;
          jogadoresMap.set(j.id, j);
        });

        const estatsComJogador = estats.map(e => ({
          ...e,
          jogador: jogadoresMap.get(e.jogadorId)
        }));

        setEstatisticas(estatsComJogador);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
        alert("Erro ao buscar estatísticas.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstatisticas();
  }, [partidaId]);

  const handleCriar = () => {
    navigate(`/${usuarioId}/times/${timeId}/partidas/${partidaId}/criar-estatistica`);
  };

  const handleEditar = (estatisticaId: number) => {
    navigate(`/${usuarioId}/times/${timeId}/partidas/${partidaId}/estatisticas/${estatisticaId}`);
  };

  const formatResumo = (e: Estatistica) => {
    const resumo: string[] = [];
    if (e.gols) resumo.push(`${e.gols} Gol${e.gols > 1 ? 's' : ''}`);
    if (e.assistencias) resumo.push(`${e.assistencias} Assistência${e.assistencias > 1 ? 's' : ''}`);
    if (e.cartoesAmarelos) resumo.push(`${e.cartoesAmarelos} Cartão Amarelo`);
    if (e.cartoesVermelhos) resumo.push(`${e.cartoesVermelhos} Cartão Vermelho`);
    if (e.faltas) resumo.push(`${e.faltas} Falta${e.faltas > 1 ? 's' : ''}`);
    if (e.minutosEmCampo) resumo.push(`${e.minutosEmCampo} min em campo`);
    return resumo.join(", ");
  };

  if (loading) {
    return <div className="text-white p-4 bg-[#111814] min-h-screen">Carregando estatísticas...</div>;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#111814] overflow-x-hidden"
         style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white text-[32px] font-bold leading-tight">Estatísticas da Partida</p>
                <p className="text-[#a3b2ab] text-sm">Desempenho dos jogadores nesta partida.</p>
              </div>
            </div>

            {partida && (
              <>
                <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5">Informações da Partida</h2>
                <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
                  <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#414e47] py-5">
                    <p className="text-[#a3b2ab] text-sm">Data</p>
                    <p className="text-white text-sm">{new Date(partida.dataHora).toLocaleString()}</p>
                  </div>
                  <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#414e47] py-5">
                    <p className="text-[#a3b2ab] text-sm">Local</p>
                    <p className="text-white text-sm">{partida.local}</p>
                  </div>
                  <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#414e47] py-5">
                    <p className="text-[#a3b2ab] text-sm">Resultado</p>
                    <p className="text-white text-sm">
                      {partida.timeCasa?.nome} {partida.placarCasa} x {partida.placarVisitante} {partida.timeVisitante?.nome}
                    </p>
                  </div>
                </div>
              </>
            )}

            <h2 className="text-white text-[22px] font-bold px-4 pb-3 pt-5">Estatísticas dos Jogadores</h2>

            {estatisticas.length === 0 ? (
              <div className="text-white px-4 py-3">
                <p>Nenhuma estatística encontrada para esta partida.</p>
                <button onClick={handleCriar} className="mt-4 rounded bg-green-600 px-4 py-2 font-semibold hover:bg-green-700">
                  Criar Estatísticas
                </button>
              </div>
            ) : (
              <>
                {estatisticas.map((e) => (
                  <div key={e.id} className="flex items-center justify-between gap-4 bg-[#131614] px-4 min-h-[72px] py-2">
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
                        style={{ backgroundImage: `url(${e.jogador?.imagemUrl || "https://via.placeholder.com/64"})` }}
                      ></div>
                      <div className="flex flex-col justify-center">
                        <p className="text-white text-base font-medium line-clamp-1">
                          {e.jogador?.nome || "Jogador Desconhecido"}
                        </p>
                        <p className="text-[#a3b2ab] text-sm line-clamp-2">{formatResumo(e)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditar(e.id)}
                      className="bg-[#10cf6f] text-[#111814] font-semibold px-4 py-1 rounded-full text-sm hover:bg-[#0db861]"
                    >
                      Editar
                    </button>
                  </div>
                ))}
                <div className="flex px-4 py-3 justify-end">
                  <button
                    onClick={handleCriar}
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#cfecdd] text-[#131614] text-sm font-bold"
                  >
                    Adicionar Estatísticas
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstatisticasPartida;