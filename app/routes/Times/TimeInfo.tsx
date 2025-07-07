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

interface Partida {
  id: number;
  descricao: string;
  local: string;
  fotoUrl?: string | null;
}

interface Time {
  id: number;
  nome: string;
  corUniforme: string;
  cidade: string;
  estado: string;
  dataFundacao: string;
  fotoUrl?: string | null;
  jogadores: Jogador[];
  partidasCasa: Partida[];
  partidasVisitante: Partida[];
}

const TimeInfo = () => {
  const { usuarioId, timeId } = useParams<{ usuarioId: string, timeId: string }>();
  const navigate = useNavigate();

  const [time, setTime] = useState<Time | null>(null);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [editMode, setEditMode] = useState(false);

  const [nome, setNome] = useState("");
  const [corUniforme, setCorUniforme] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [dataFundacao, setDataFundacao] = useState("");

  useEffect(() => {
    if (!timeId) return;

    async function fetchTime() {
      try {
        const res = await api.get(`/Times/${timeId}`);
        const data: Time = res.data;

        const res2 = await api.get(`/Jogadores`);

        const jogadoresFiltrados = res2.data.filter((j: Jogador) => j.timeId === data.id);
        setJogadores(jogadoresFiltrados);   

        setTime(data);
        setNome(data.nome || "");
        setCorUniforme(data.corUniforme || "");
        setCidade(data.cidade || "");
        setEstado(data.estado || "");
        setDataFundacao(data.dataFundacao || "");
      } catch (error) {
        console.error("Erro ao buscar time:", error);
      }
    }

    fetchTime();
  }, [timeId]);

  async function handleSave() {
    if (!time) return;

    try {
      const body = { nome, corUniforme, cidade, estado, dataFundacao };
      await api.patch(`/Times/${time.id}`, body);

      alert("Time atualizado com sucesso!");
      setEditMode(false);
      setTime({ ...time, ...body });
    } catch (error) {
      console.error("Erro ao salvar time:", error);
      alert("Erro ao salvar alterações.");
    }
  }

  function verTodosJogadores() {
    navigate(`jogadores`);
  }

  function verTodasPartidas() {
    navigate(`partidas`);
  }

  if (!time) return <p className="text-white p-4">Carregando informações do time...</p>;

  const ultimasPartidas = [...time.partidasCasa, ...time.partidasVisitante].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111814] overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <div className="px-40 flex flex-1 py-5 gap-8">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Detalhes do Time</p>
              {!editMode ? (
                <button onClick={() => setEditMode(true)} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-[#283930] text-white text-sm font-medium">Editar</button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSave} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-[#10cf6f] text-[#111814] text-sm font-medium">Salvar</button>
                  <button onClick={() => setEditMode(false)} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-[#cc4343] text-white text-sm font-medium">Cancelar</button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <InputField label="Nome" value={nome} onChange={setNome} disabled={!editMode} />
                <InputField label="Cor do Uniforme" value={corUniforme} onChange={setCorUniforme} disabled={!editMode} />
                <InputField label="Cidade" value={cidade} onChange={setCidade} disabled={!editMode} />
                <InputField label="Estado" value={estado} onChange={setEstado} disabled={!editMode} />
                <InputField label="Data de Fundação" value={dataFundacao} onChange={setDataFundacao} disabled={!editMode} type="date" />
              </div>

              <div className="flex items-center justify-center">
                <div className="rounded-xl overflow-hidden w-64 h-64 bg-center bg-cover" style={{ backgroundImage: `url(${time.fotoUrl || "https://via.placeholder.com/256"})` }} />
              </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-8">Jogadores</h2>
            <div className="flex overflow-y-auto scrollbar-hide">
              <div className="flex items-stretch p-4 gap-8">
                {jogadores.length === 0 ? (
                  <p className="text-white px-4">Nenhum jogador cadastrado.</p>
                ) : (
                  jogadores.slice(0, 3).map((j) => (
                    <div key={j.id} className="flex flex-col gap-4 text-center rounded-lg min-w-32 pt-4">
                      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-full self-center" style={{ backgroundImage: `url(${j.imagemUrl || "https://via.placeholder.com/150"})` }}></div>
                      <div>
                        <p className="text-white text-base font-medium">{j.nome}</p>
                        <p className="text-[#9db9ab] text-sm font-normal">{j.posicao}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button onClick={verTodosJogadores} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#283930] text-white text-sm font-bold">Ver Todos os Jogadores</button>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Partidas Recentes</h2>
            {ultimasPartidas.length === 0 ? (
              <p className="text-white px-4">Nenhuma partida registrada.</p>
            ) : (
              ultimasPartidas.map((p) => (
                <div key={p.id} className="flex items-center gap-4 bg-[#111814] px-4 min-h-[72px] py-2 rounded-lg">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 w-14 h-14 flex-shrink-0" style={{ backgroundImage: `url(${p.fotoUrl || "https://via.placeholder.com/150"})` }}></div>
                  <div className="flex flex-col justify-center overflow-hidden">
                    <p className="text-white text-base font-medium line-clamp-1">{p.descricao}</p>
                    <p className="text-[#9db9ab] text-sm font-normal line-clamp-2">{p.local}</p>
                  </div>
                </div>
              ))
            )}
            <div className="flex px-4 py-3 justify-start">
              <button onClick={verTodasPartidas} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#283930] text-white text-sm font-bold">Ver Todas as Partidas</button>
            </div>

            <div className="flex px-4 py-3 justify-start">
              <button onClick={() => {
                if (!time) return;
                if (!window.confirm("Tem certeza que deseja apagar esse time?")) return;

                api.delete(`/Times/${time.id}`).then(() => {
                  alert("Time apagado com sucesso!");
                  navigate(`/profile/${usuarioId}`);
                }).catch((err) => {
                  console.error("Erro ao apagar time:", err);
                  alert("Erro ao apagar time.");
                });
              }}
                className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-transparent text-white text-sm font-bold">
                Apagar Time
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


export default TimeInfo;
