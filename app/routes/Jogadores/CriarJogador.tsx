import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";

const CriarJogador = () => {
  const navigate = useNavigate();
  const { usuarioId, timeId } = useParams();

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [posicao, setPosicao] = useState("");
  const [numeroCamisa, setNumeroCamisa] = useState("");
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        const res = await api.get(`Times`);

        const timeFiltrado = res.data.filter(
          (time: any) => time.usuarioId === Number(usuarioId)
        );

        if (timeFiltrado.length == 0) {
          alert("Você precisa criar um time antes de adicionar jogadores.");
          navigate(`/${usuarioId}/times/criar-time`);
        }

      } catch (err) {
        console.error("Erro ao buscar time:", err);
        alert("Erro ao buscar time.");
      }
    };
    fetchTime();
  }, [usuarioId, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await api.post("/Jogadores", {
        nome,
        dataNascimento,
        altura,
        peso,
        posicao,
        numeroCamisa,
        timeId,
        usuarioId,
      });

      const jogadorId = res.data.id;

      if (fotoFile) {
        const formData = new FormData();
        formData.append("foto", fotoFile);
        await api.post(`Jogadores/${jogadorId}/upload-foto`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Jogador criado com sucesso!");
      navigate(`/${usuarioId}/times/${timeId}/jogadores`);

    } catch (error) {
      console.error("Erro ao criar jogador:", error);
      alert("Erro ao criar jogador.");
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
              <p className="text-white text-[32px] font-bold leading-tight min-w-72">Criar Jogador</p>
            </div>

            {/* Upload de imagem */}
            <div className="flex w-full grow bg-[#131614] p-4">
              <div className="w-full gap-2 overflow-hidden aspect-[3/2] rounded-xl flex bg-[#131614]">
                {fotoPreview ? (
                  <div
                    className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-xl"
                    style={{ backgroundImage: `url("${fotoPreview}")` }}
                  ></div>
                ) : (
                  <div className="w-full flex items-center justify-center bg-[#1e2421] rounded-xl border border-[#3b5447]">
                    <p className="text-[#9db9ab] text-sm">Nenhuma imagem selecionada</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex px-4 pb-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-[#9db9ab] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#10cf6f] file:text-[#111814] hover:file:bg-[#0da85d]"
              />
            </div>

            {/* Campos do formulário */}
            <div className="grid grid-cols-2 gap-4 px-4 py-3">
              <label className="flex flex-col">
                <p className="text-white text-base font-medium pb-2">Nome</p>
                <input
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  placeholder="Digite o nome do jogador"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </label>

              <label className="flex flex-col">
                <p className="text-white text-base font-medium pb-2">Data de Nascimento</p>
                <input
                  type="date"
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </label>

              <label className="flex flex-col">
                <p className="text-white text-base font-medium pb-2">Altura (cm)</p>
                <input
                  type="number"
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
                  placeholder="Ex: 180"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                />
              </label>

              <label className="flex flex-col">
                <p className="text-white text-base font-medium pb-2">Peso (kg)</p>
                <input
                  type="number"
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
                  placeholder="Ex: 75"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                />
              </label>

              <label className="flex flex-col col-span-2">
                <p className="text-white text-base font-medium pb-2">Posição</p>
                <input
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
                  placeholder="Ex: Atacante"
                  value={posicao}
                  onChange={(e) => setPosicao(e.target.value)}
                />
              </label>

              <label className="flex flex-col col-span-2">
                <p className="text-white text-base font-medium pb-2">Número da Camisa</p>
                <input
                  type="number"
                  className="form-input rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px]"
                  placeholder="Ex: 10"
                  value={numeroCamisa}
                  onChange={(e) => setNumeroCamisa(e.target.value)}
                />
              </label>
            </div>

            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={handleSubmit}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#cbebdb] text-[#131614] text-sm font-bold"
              >
                Criar Jogador
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarJogador;
