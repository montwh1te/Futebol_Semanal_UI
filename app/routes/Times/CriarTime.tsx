import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";


const CriarTime = () => {

  const navigate = useNavigate();
  const { usuarioId } = useParams();


  const [nome, setNome] = useState("");
  const [corUniforme, setCorUniforme] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [dataFundacao, setDataFundacao] = useState("");
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);

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

      const timeRes = await api.post("/Times", {
        nome,
        corUniforme,
        cidade,
        estado,
        dataFundacao,
        usuarioId,
      });

      const timeId = timeRes.data.id;

      if (fotoFile) {
        const formData = new FormData();
        formData.append("foto", fotoFile);

        await api.post(`Times/${timeId}/upload-foto`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Time criado com sucesso!");
      navigate(`/${usuarioId}/times`);
    } catch (error) {
      console.error("Erro ao criar time:", error);
      alert("Erro ao criar time.");
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
              <p className="text-white text-[32px] font-bold leading-tight min-w-72">Criar um Time</p>
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

            {/* Campos de formulário */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">Nome do Time</p>
                <input
                  placeholder="Digite o nome do time"
                  className="form-input w-full rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">Cor do Uniforme</p>
                <input
                  placeholder="Digite a cor do uniforme"
                  className="form-input w-full rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  value={corUniforme}
                  onChange={(e) => setCorUniforme(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">Cidade</p>
                <input
                  placeholder="Digite a cidade"
                  className="form-input w-full rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />
              </label>

              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">Estado</p>
                <input
                  placeholder="Digite o estado"
                  className="form-input w-full rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">Data de Fundação</p>
                <input
                  type="date"
                  placeholder="DD/MM/AAAA"
                  className="form-input w-full rounded-xl text-white border border-[#414e47] bg-[#1e2421] h-14 p-[15px] placeholder:text-[#a3b2ab]"
                  value={dataFundacao}
                  onChange={(e) => setDataFundacao(e.target.value)}
                />
              </label>
            </div>

            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={handleSubmit}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#cbebdb] text-[#131614] text-sm font-bold"
              >
                Criar Time
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriarTime;
