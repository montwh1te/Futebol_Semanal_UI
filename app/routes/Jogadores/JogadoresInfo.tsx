import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import Header from "../../components/Header";

type Jogador = {
  id: number;
  nome: string;
  posicao: string;
  imagemUrl: string;
};

const ListaJogadores = () => {
  const { usuarioId, timeId } = useParams();
  const navigate = useNavigate();
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const res = await api.get(`/Jogadores`);
        const jogadoresFiltrados = res.data.filter(
          (jogador: any) => jogador.timeId === Number(timeId)
        );
        setJogadores(jogadoresFiltrados);
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJogadores();
  }, [usuarioId, timeId]);

  const handleCriarJogador = () => {
    navigate(`/${usuarioId}/times/${timeId}/criar-jogador`);
  };

  const handleVisualizarJogador = (jogadorId: number) => {
    navigate(`${jogadorId}`);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#131614] dark group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                  Jogadores do Time
                </p>
                <p className="text-[#a3b2ab] text-sm font-normal leading-normal">
                  Veja todos os jogadores associados ao seu time
                </p>
              </div>
              <button
                onClick={handleCriarJogador}
                className="bg-[#38e07b] text-[#111714] px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#2ec86b] self-center"
              >
                Criar Jogador
              </button>
            </div>

            {loading ? (
              <p className="text-white px-4 py-3">Carregando jogadores...</p>
            ) : jogadores.length === 0 ? (
              <p className="text-white px-4 py-3">Nenhum jogador cadastrado ainda.</p>
            ) : (
              jogadores.map((jogador) => (
                <div
                  key={jogador.id}
                  onClick={() => handleVisualizarJogador(jogador.id)}
                  className="flex items-center gap-4 bg-[#131614] px-4 min-h-[72px] py-2 cursor-pointer hover:bg-[#1c1f1d] rounded-md"
                >
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14"
                    style={{ backgroundImage: `url("${jogador.imagemUrl}")` }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white text-base font-medium leading-normal line-clamp-1">
                      {jogador.nome}
                    </p>
                    <p className="text-[#a3b2ab] text-sm font-normal leading-normal line-clamp-2">
                      {jogador.posicao}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaJogadores;
