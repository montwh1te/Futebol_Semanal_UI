// src/pages/Partidas/PartidaInfo.tsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";

interface Partida {
  id: number;
  local: string;
  dataHora: string;
  condicoesClimaticas: string;
  campeonato: string;
  timeCasaId: number;
  timeVisitanteId: number;
  placarCasa: number;
  placarVisitante: number;
  fotoUrl?: string;
}

const PartidaInfo = () => {
  const { usuarioId, timeId, partidaId } = useParams();
  const navigate = useNavigate();

  const [partida, setPartida] = useState<Partida | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [local, setLocal] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [condicoesClimaticas, setCondicoesClimaticas] = useState("");
  const [campeonato, setCampeonato] = useState("");
  const [placarCasa, setPlacarCasa] = useState(0);
  const [placarVisitante, setPlacarVisitante] = useState(0);

  useEffect(() => {
    const fetchPartida = async () => {
      try {
        const res = await api.get(`/Partidas/${partidaId}`);
        const data = res.data;
        setPartida(data);
        setLocal(data.local);
        setDataHora(data.dataHora);
        setCondicoesClimaticas(data.condicoesClimaticas);
        setCampeonato(data.campeonato);
        setPlacarCasa(data.placarCasa);
        setPlacarVisitante(data.placarVisitante);
      } catch (err) {
        console.error("Erro ao buscar partida:", err);
        alert("Erro ao buscar dados da partida.");
      }
    };

    fetchPartida();
  }, [partidaId]);

  const handleSave = async () => {
    try {
      await api.patch(`/Partidas/${partidaId}`, {
        local,
        dataHora,
        condicoesClimaticas,
        campeonato,
        placarCasa,
        placarVisitante,
      });

      alert("Partida atualizada com sucesso!");
      setEditMode(false);
    } catch (err) {
      console.error("Erro ao atualizar partida:", err);
      alert("Erro ao atualizar partida.");
    }
  };

  const handleEstatisticasClick = () => {
    navigate(`estatisticas`);
  };

  if (!partida) {
    return (
      <div className="text-white p-4 bg-[#111814] min-h-screen">
        Carregando dados da partida...
      </div>
    );
  }

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
                Detalhes da Partida
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
                    onClick={() => setEditMode(false)}
                    className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-8 px-4 bg-[#cc4343] text-white text-sm font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <InputField label="Local" value={local} onChange={setLocal} disabled={!editMode} />
                <InputField label="Data e Hora" value={dataHora} onChange={setDataHora} disabled={!editMode} type="datetime-local" />
                <InputField label="Condições Climáticas" value={condicoesClimaticas} onChange={setCondicoesClimaticas} disabled={!editMode} />
                <InputField label="Campeonato" value={campeonato} onChange={setCampeonato} disabled={!editMode} />
                <InputField label="Placar Casa" value={placarCasa.toString()} onChange={(v) => setPlacarCasa(Number(v))} disabled={!editMode} type="number" />
                <InputField label="Placar Visitante" value={placarVisitante.toString()} onChange={(v) => setPlacarVisitante(Number(v))} disabled={!editMode} type="number" />
              </div>

              <div className="flex items-center justify-center">
                <div
                  className="rounded-xl overflow-hidden w-64 h-64 bg-center bg-cover"
                  style={{ backgroundImage: `url(${partida.fotoUrl || "https://via.placeholder.com/256"})` }}
                />
              </div>
            </div>

            <div className="flex px-4 py-3 justify-start mt-10 gap-4">
              <button
                onClick={() => navigate(`/${usuarioId}/times/${timeId}/partidas`)}
                className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#283930] text-white text-sm font-bold"
              >
                Voltar para Lista de Partidas
              </button>
              <button
                onClick={handleEstatisticasClick}
                className="flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#cbebdb] text-[#131614] text-sm font-bold"
              >
                Ver Estatísticas da Partida
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

export default PartidaInfo;
