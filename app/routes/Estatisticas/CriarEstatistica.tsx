import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";

interface Jogador {
  id: number;
  nome: string;
  imagemUrl?: string;
}

const CriarEstatistica = () => {
  const navigate = useNavigate();
  const { usuarioId, timeId, partidaId } = useParams<{
    usuarioId: string;
    timeId: string;
    partidaId: string;
  }>();

  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [jogadorId, setJogadorId] = useState("");
  const [gols, setGols] = useState("");
  const [assistencias, setAssistencias] = useState("");
  const [faltas, setFaltas] = useState("");
  const [cartoesAmarelos, setCartoesAmarelos] = useState("");
  const [cartoesVermelhos, setCartoesVermelhos] = useState("");
  const [minutosEmCampo, setMinutosEmCampo] = useState("");

  useEffect(() => {
    async function fetchJogadores() {
      try {
        const partidas = await api.get(`/Partidas?partidaId=${partidaId}`);
        setJogadores(partidas.data);

        const timeCasaId = partidas.data.timeCasaId;
        const timeVisitanteId = partidas.data.timeVisitanteId;
        
        const res = await api.get(`/Jogadores?timeId=${timeCasaId ?? timeVisitanteId}`);
        setJogadores(res.data);
      } catch (err) {
        console.error("Erro ao buscar jogadores:", err);
        alert("Erro ao buscar jogadores.");
      }
    }

    fetchJogadores();
  }, [timeId]);

  async function handleSubmit() {
    if (!jogadorId) {
      alert("Selecione um jogador.");
      return;
    }

    const estatistica = {
      jogadorId: Number(jogadorId),
      timeId: Number(timeId),
      partidaId: Number(partidaId),
      gols: gols ? Number(gols) : 0,
      assistencias: assistencias ? Number(assistencias) : 0,
      faltas: faltas ? Number(faltas) : 0,
      cartoesAmarelos: cartoesAmarelos ? Number(cartoesAmarelos) : 0,
      cartoesVermelhos: cartoesVermelhos ? Number(cartoesVermelhos) : 0,
      minutosEmCampo: minutosEmCampo ? Number(minutosEmCampo) : 0,
    };

    try {
      await api.post("/Estatisticas", estatistica);
      alert("Estatística criada com sucesso!");
      navigate(`/${usuarioId}/times/${timeId}/partidas/${partidaId}/estatisticas`);
    } catch (err) {
      console.error("Erro ao criar estatística:", err);
      alert("Erro ao criar estatística.");
    }
  }

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111814] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white text-[32px] font-bold leading-tight min-w-72">
                Criar Estatística
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 px-4 py-3">
              <label className="flex flex-col">
                <p className="text-white text-base font-medium pb-2">Jogador</p>
                <select
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-3"
                  value={jogadorId}
                  onChange={(e) => setJogadorId(e.target.value)}
                >
                  <option value="">Selecione um jogador</option>
                  {jogadores.map((j) => (
                    <option key={j.id} value={j.id}>{j.nome}</option>
                  ))}
                </select>
              </label>

              <Input label="Gols" value={gols} setValue={setGols} />
              <Input label="Assistências" value={assistencias} setValue={setAssistencias} />
              <Input label="Faltas" value={faltas} setValue={setFaltas} />
              <Input label="Cartões Amarelos" value={cartoesAmarelos} setValue={setCartoesAmarelos} />
              <Input label="Cartões Vermelhos" value={cartoesVermelhos} setValue={setCartoesVermelhos} />
              <Input label="Minutos em Campo" value={minutosEmCampo} setValue={setMinutosEmCampo} />

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmit}
                  className="rounded-full bg-[#cbebdb] px-6 h-10 text-[#111814] text-sm font-bold"
                >
                  Criar Estatística
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const Input = ({ label, value, setValue }: { label: string; value: string; setValue: (v: string) => void }) => (
  <label className="flex flex-col">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <input
      type="number"
      className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </label>
);

export default CriarEstatistica;
