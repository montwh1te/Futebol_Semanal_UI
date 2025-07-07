import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

interface Jogador {
  id: number;
  nome: string;
  posicao: string;
  imagemUrl?: string | null;
  timeId: number;
}

interface Estatistica {
  id: number;
  jogadorId: number;
  gols: number;
  assistencias: number;
  partidas: number;
  minutosEmCampo: number;
  cartoesAmarelos: number;
  cartoesVermelhos: number;
}

const JogadorInfo = () => {
  const { usuarioId, jogadorId } = useParams<{ usuarioId: string; jogadorId: string }>();
  const navigate = useNavigate();

  const [jogador, setJogador] = useState<Jogador | null>(null);
  const [estatisticas, setEstatisticas] = useState<Estatistica[]>([]);
  const [statsSum, setStatsSum] = useState({
    gols: 0,
    assistencias: 0,
    partidas: 0,
    cartoesAmarelos: 0,
    cartoesVermelhos: 0,
    minutosEmCampo: 0,
  });
  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [nome, setNome] = useState("");
  const [posicao, setPosicao] = useState("");

  useEffect(() => {
    if (!jogadorId) return;

    async function fetchDados() {
      setLoading(true);
      try {
        // Buscar dados do jogador
        const resJogador = await api.get(`/Jogadores/${jogadorId}`);
        const jogadorData = resJogador.data;
        setJogador(jogadorData);

        setNome(jogadorData.nome || "");
        setPosicao(jogadorData.posicao || "");

        // Buscar todas as estatísticas
        const resStats = await api.get(`/Estatisticas`);
        // Filtrar estatísticas só do jogador atual
        const statsJogador = resStats.data.filter(
          (stat: Estatistica) => stat.jogadorId === Number(jogadorId)
        );
        setEstatisticas(statsJogador);

        // Somar as estatísticas
        const soma = statsJogador.reduce(
          (acc: any, stat: any) => ({
            partidas: acc.partidas + (stat.partidas || 0),
            gols: acc.gols + (stat.gols || 0),
            assistencias: acc.assistencias + (stat.assistencias || 0),
            cartoesAmarelos: acc.cartoesAmarelos + (stat.cartoesAmarelos || 0),
            cartoesVermelhos: acc.cartoesVermelhos + (stat.cartoesVermelhos || 0),
            minutosEmCampo: acc.minutosEmCampo + (stat.minutosEmCampo || 0),
          }),
          { gols: 0, assistencias: 0, partidas: 0, cartoesAmarelos: 0, cartoesVermelhos: 0, minutosEmCampo: 0 }
        );
        setStatsSum(soma);
      } catch (error) {
        console.error("Erro ao buscar dados do jogador:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDados();
  }, [jogadorId]);

  async function handleSave() {
    if (!jogador) return;

    try {
      const body = { nome, posicao };
      await api.patch(`/Jogadores/${jogador.id}`, body);

      setJogador({ ...jogador, ...body });
      setEditMode(false);
      alert("Jogador atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar jogador:", error);
      alert("Erro ao salvar alterações.");
    }
  }

  if (loading) return <p className="text-white p-4">Carregando dados do jogador...</p>;
  if (!jogador) return <p className="text-white p-4">Jogador não encontrado.</p>;

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111814] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <div className="px-40 flex flex-1 py-5 gap-8">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                Perfil do Jogador
              </p>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-[#283930] text-white text-sm font-medium"
                >
                  Editar
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-[#10cf6f] text-[#111814] text-sm font-medium"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setNome(jogador.nome);
                      setPosicao(jogador.posicao);
                      setEditMode(false);
                    }}
                    className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-[#cc4343] text-white text-sm font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Form inputs esquerda */}
              <div className="flex flex-col gap-4">
                <InputField label="Nome" value={nome} onChange={setNome} disabled={!editMode} />
                <InputField label="Posição" value={posicao} onChange={setPosicao} disabled={!editMode} />
              </div>

              {/* Imagem direita */}
              <div className="flex items-center justify-center">
                <div
                  className="rounded-full overflow-hidden w-64 h-64 bg-center bg-cover"
                  style={{ backgroundImage: `url(${jogador.imagemUrl || "https://via.placeholder.com/256"})` }}
                />
              </div>
            </div>

            {/* Estatísticas abaixo do form */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-8">
              Estatísticas acumuladas
            </h2>
            <div className="flex flex-wrap gap-6 px-4 text-white text-lg">
              <EstatisticaItem label="Partidas" value={statsSum.partidas} />
              <EstatisticaItem label="Gols" value={statsSum.gols} />
              <EstatisticaItem label="Assistências" value={statsSum.assistencias} />
              <EstatisticaItem label="Cartões Amarelos" value={statsSum.cartoesAmarelos} />
              <EstatisticaItem label="Cartões Vermelhos" value={statsSum.cartoesVermelhos} />
              <EstatisticaItem label="Minutos em Campo" value={statsSum.minutosEmCampo} />
            </div>

            <div className="flex px-4 py-3 justify-start mt-10">
              <button
                onClick={() => navigate(`/${usuarioId}/times/${jogador.timeId}`)}
                className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#283930] text-white text-sm font-bold"
              >
                Voltar para Time
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  disabled,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  type?: string;
}) => (
  <label className="flex flex-col">
    <p className="text-white text-base font-medium leading-normal pb-2">{label}</p>
    <input
      type={type}
      className="form-input w-full rounded-xl text-white border-none bg-[#283930] h-14 p-4 placeholder:text-[#9db9ab]"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  </label>
);

const EstatisticaItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col rounded-lg bg-[#283930] w-36 h-24 p-4 justify-center items-center">
    <p className="text-white text-xl font-bold">{value}</p>
    <p className="text-[#9db9ab] text-sm">{label}</p>
  </div>
);

export default JogadorInfo;
