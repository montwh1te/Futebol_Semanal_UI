import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";

const CriarPartida = () => {
  const navigate = useNavigate();
  const { usuarioId, timeId } = useParams();

  const [local, setLocal] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [condicoesClimaticas, setCondicoesClimaticas] = useState("");
  const [campeonato, setCampeonato] = useState("");
  const [timeCasaId, setTimeCasaId] = useState("");
  const [timeVisitanteId, setTimeVisitanteId] = useState("");

  const [times, setTimes] = useState<any[]>([]);
  const [oponentes, setOponentes] = useState<any[]>([]);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const res = await api.get("/Times");
        const timesUsuario = res.data.filter(
          (time: any) => time.usuarioId === Number(usuarioId)
        );

        if (timesUsuario.length === 0) {
          alert("Você precisa criar um time antes de criar uma partida.");
          navigate(`/${usuarioId}/times/criar-time`);
          return;
        }

        setTimes(timesUsuario);
        setOponentes(res.data);
      } catch (err) {
        console.error("Erro ao buscar times:", err);
        alert("Erro ao buscar times.");
      }
    };

    fetchTimes();
  }, [usuarioId, navigate]);

  const handleSubmit = async () => {
    if (!timeCasaId || !timeVisitanteId) {
        alert("Selecione o time da casa e o time visitante.");
        return;
      }
      if (timeCasaId === timeVisitanteId) {
        alert("O time da casa e o time visitante devem ser times diferentes.");
        return;
      }

      try {
        await api.post("/Partidas", {
          local,
          dataHora,
          condicoesClimaticas,
          campeonato,
          timeCasaId: Number(timeCasaId),  // convertendo para número
          timeVisitanteId: Number(timeVisitanteId),
          usuarioId: Number(usuarioId),    // convertendo para número
        });

        alert("Partida criada com sucesso!");
        navigate(`/${usuarioId}/times/${timeId}/partidas`);  // adicionando barra no começo
      } catch (error) {
        console.error("Erro ao criar partida:", error);
        alert("Erro ao criar partida.");
      }
    };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#131614] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white text-[32px] font-bold leading-tight min-w-72">Criar Partida</p>
            </div>

            <div className="grid grid-cols-2 gap-4 px-4 py-3">
              <label className="flex flex-col col-span-2">
                <p className="text-white text-base font-medium pb-2">Local</p>
                <input
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  placeholder="Digite o local da partida"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                />
              </label>

              <label className="flex flex-col col-span-2">
                <p className="text-white text-base font-medium pb-2">Data e Hora</p>
                <input
                  type="datetime-local"
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                />
              </label>

              <label className="flex flex-col col-span-2">
                <p className="text-white text-base font-medium pb-2">Condições Climáticas</p>
                <input
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  placeholder="Ex: Ensolarado, Nublado..."
                  value={condicoesClimaticas}
                  onChange={(e) => setCondicoesClimaticas(e.target.value)}
                />
              </label>

              <label className="flex flex-col col-span-2">
                <p className="text-white text-base font-medium pb-2">Campeonato</p>
                <input
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  placeholder="Nome do campeonato"
                  value={campeonato}
                  onChange={(e) => setCampeonato(e.target.value)}
                />
              </label>

              <label className="flex flex-col">
                <p className="text-white text-base font-medium pb-2">Time Casa</p>
                <select
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
                  value={timeCasaId}
                  onChange={(e) => setTimeCasaId(e.target.value)}
                >
                  <option value="">Selecione o time casa</option>
                  {times.map((time) => (
                    <option key={time.id} value={time.id}>
                      {time.nome}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                <p className="text-white text-base font-medium pb-2">Time Visitante</p>
                <select
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
                  value={timeVisitanteId}
                  onChange={(e) => setTimeVisitanteId(e.target.value)}
                >
                  <option value="">Selecione o time visitante</option>
                  {oponentes.map((time) => (
                    <option key={time.id} value={time.id}>
                      {time.nome}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={handleSubmit}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#cbebdb] text-[#131614] text-sm font-bold"
              >
                Criar Partida
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarPartida;
