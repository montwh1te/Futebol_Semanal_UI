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
}

interface Jogador {
  id: number;
  nome: string;
  imagemUrl?: string | null;
}

const EditarEstatistica = () => {
  const navigate = useNavigate();
  const { usuarioId, timeId, partidaId, estatisticaId } = useParams();

  const [estatistica, setEstatistica] = useState<Estatistica | null>(null);
  const [jogador, setJogador] = useState<Jogador | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Campos do formulário
  const [gols, setGols] = useState<number | "">("");
  const [assistencias, setAssistencias] = useState<number | "">("");
  const [faltas, setFaltas] = useState<number | "">("");
  const [cartoesAmarelos, setCartoesAmarelos] = useState<number | "">("");
  const [cartoesVermelhos, setCartoesVermelhos] = useState<number | "">("");
  const [minutosEmCampo, setMinutosEmCampo] = useState<number | "">("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Busca a estatística
        const estatisticaRes = await api.get(`/Estatisticas/${estatisticaId}`);
        const estatisticaData: Estatistica = estatisticaRes.data;
        setEstatistica(estatisticaData);

        // Inicializa campos do form
        setGols(estatisticaData.gols ?? "");
        setAssistencias(estatisticaData.assistencias ?? "");
        setFaltas(estatisticaData.faltas ?? "");
        setCartoesAmarelos(estatisticaData.cartoesAmarelos ?? "");
        setCartoesVermelhos(estatisticaData.cartoesVermelhos ?? "");
        setMinutosEmCampo(estatisticaData.minutosEmCampo ?? "");

        // 2) Busca os dados do jogador separado pelo jogadorId
        if (estatisticaData.jogadorId) {
          try {
            const jogadorRes = await api.get(`/Jogadores/${estatisticaData.jogadorId}`);
            setJogador(jogadorRes.data);
          } catch {
            // Se der erro, colocar jogador padrão
            setJogador({
              id: estatisticaData.jogadorId,
              nome: "Jogador Desconhecido",
              imagemUrl: null,
            });
          }
        } else {
          // Caso não tenha jogadorId
          setJogador({
            id: 0,
            nome: "Jogador Desconhecido",
            imagemUrl: null,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar estatística ou jogador:", error);
        alert("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [estatisticaId]);

  const handleSave = async () => {
    if (!estatistica) return;
    setSaving(true);
    try {
      await api.patch(`/Estatisticas/${estatistica.id}`, {
        gols: gols === "" ? null : gols,
        assistencias: assistencias === "" ? null : assistencias,
        faltas: faltas === "" ? null : faltas,
        cartoesAmarelos: cartoesAmarelos === "" ? null : cartoesAmarelos,
        cartoesVermelhos: cartoesVermelhos === "" ? null : cartoesVermelhos,
        minutosEmCampo: minutosEmCampo === "" ? null : minutosEmCampo,
      });
      alert("Estatística atualizada com sucesso!");
      navigate(`/${usuarioId}/times/${timeId}/partidas/${partidaId}/estatisticas`);
    } catch (error) {
      console.error("Erro ao salvar estatística:", error);
      alert("Erro ao salvar estatística.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!estatistica) return;
    if (!window.confirm("Tem certeza que deseja excluir esta estatística?")) return;

    setDeleting(true);
    try {
      await api.delete(`/Estatisticas/${estatistica.id}`);
      alert("Estatística excluída com sucesso!");
      navigate(`/${usuarioId}/times/${timeId}/partidas/${partidaId}/estatisticas`);
    } catch (error) {
      console.error("Erro ao excluir estatística:", error);
      alert("Erro ao excluir estatística.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111814] text-white text-lg font-semibold">
        Carregando estatística...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#111814] font-sans flex flex-col"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <Header />
      <main className="flex-grow flex justify-center px-6 py-8">
        <section className="bg-[#1e2726] rounded-lg shadow-lg max-w-lg w-full p-8 text-white">
          <h1 className="text-3xl font-bold mb-8 text-center">Editar Estatística</h1>

          {estatistica && (
            <>
              <div className="flex items-center gap-5 mb-8">
                <img
                  src={jogador?.imagemUrl || "https://via.placeholder.com/80?text=Sem+Foto"}
                  alt={jogador?.nome || "Jogador Desconhecido"}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#10cf6f]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/80?text=Sem+Foto";
                  }}
                />
                <div>
                  <p className="text-xl font-semibold">{jogador?.nome || "Jogador Desconhecido"}</p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-5"
              >
                {[
                  { label: "Gols", state: gols, setter: setGols },
                  { label: "Assistências", state: assistencias, setter: setAssistencias },
                  { label: "Faltas", state: faltas, setter: setFaltas },
                  { label: "Cartões Amarelos", state: cartoesAmarelos, setter: setCartoesAmarelos },
                  { label: "Cartões Vermelhos", state: cartoesVermelhos, setter: setCartoesVermelhos },
                  { label: "Minutos em Campo", state: minutosEmCampo, setter: setMinutosEmCampo },
                ].map(({ label, state, setter }) => (
                  <label key={label} className="block">
                    <span className="text-white font-medium mb-1 block">{label}</span>
                    <input
                      type="number"
                      min={0}
                      value={state}
                      onChange={(e) =>
                        setter(e.target.value === "" ? "" : Number(e.target.value))
                      }
                      className="w-full rounded-md px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-[#10cf6f]"
                      placeholder={`Informe ${label.toLowerCase()}`}
                    />
                  </label>
                ))}

                <div className="flex gap-4 mt-8">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#10cf6f] text-[#111814] font-semibold py-3 rounded-full hover:bg-[#0db861] transition"
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 bg-[#cc4343] text-white font-semibold py-3 rounded-full hover:bg-[#b43a3a] transition"
                  >
                    {deleting ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default EditarEstatistica;
