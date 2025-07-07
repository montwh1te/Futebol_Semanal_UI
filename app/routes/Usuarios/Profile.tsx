import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { usuarioId } = useParams();
  const [perfil, setPerfil] = useState<any>(null);
  const [equipes, setEquipes] = useState<any[]>([]);
  const [loadingEquipes, setLoadingEquipes] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const perfilRes = await api.get(`/Usuarios/${usuarioId}`);
        setPerfil(perfilRes.data);

        const timesRes = await api.get("/Times");

        const timesFiltrados = timesRes.data.filter(
          (time: any) => time.usuarioId === Number(usuarioId)
        );

        // Garante que equipes sempre será um array
        setEquipes(timesFiltrados);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoadingEquipes(false);
      }
    };

    fetchData();
  }, []);

  if (!perfil) return <p className="text-white p-4">Carregando perfil...</p>;

  const handleUpdate = async () => {
    try {

      await api.patch(`/Usuarios/${usuarioId}`, {
        nome: perfil.nome,
        email: perfil.email,
        senha: perfil.senha,
        telefone: perfil.telefone,
      });

      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert("Erro ao atualizar perfil.");
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#111814] overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Coluna do perfil */}
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white text-[32px] font-bold leading-tight min-w-72">
                Meu Perfil
              </p>
            </div>

            {["nome", "email", "senha", "telefone"].map((field) => (
              <div
                key={field}
                className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3"
              >
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-white text-base font-medium pb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </p>
                  <input
                    type={field === "senha" ? "password" : "text"}
                    className="form-input w-full rounded-xl text-white border border-[#3b5447] bg-[#1c2721] h-14 p-[15px] placeholder:text-[#9db9ab]"
                    value={perfil[field]}
                    onChange={(e) =>
                      setPerfil({ ...perfil, [field]: e.target.value })
                    }
                  />
                </label>
              </div>
            ))}

            <div className="flex px-4 py-3">
              <button
                onClick={handleUpdate}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-full h-10 px-4 flex-1 bg-[#10cf6f] text-[#111814] text-sm font-bold"
              >
                <span className="truncate">Salvar Alterações</span>
              </button>
            </div>
          </div>

          {/* Coluna das equipes */}
          <div className="layout-content-container flex flex-col w-[360px]">
            <h2 className="text-white text-[22px] font-bold tracking-[-0.015em] px-4 pb-3 pt-5">
              Minhas Equipes
            </h2>

            {loadingEquipes ? (
              <p className="text-white text-sm px-4 py-2">Carregando equipes...</p>
            ) : equipes.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 px-4 py-8 bg-[#1c2721] rounded-xl">
                <p className="text-[#9db9ab] text-sm text-center">
                  Você ainda não tem nenhuma equipe cadastrada.
                </p>
                <button
                  onClick={() => navigate(`/${usuarioId}/times/criar-time`)}
                  className="bg-[#10cf6f] text-[#111814] font-bold px-5 py-2 rounded-full text-sm"
                >
                  Criar nova equipe
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 px-4">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                {equipes.map((equipe, i) => (
                  <div className="flex flex-col gap-3" key={i}>
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{
                        backgroundImage: `url('${equipe.fotoUrl}')`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Botão de Ver todas as equipes */}
              <button
                onClick={() => navigate(`/${usuarioId}/times`)}
                className="bg-[#10cf6f] text-[#111814] font-bold px-5 py-2 rounded-full text-sm"
              >
                Ver todas as equipes
              </button>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
