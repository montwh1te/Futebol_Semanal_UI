import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="relative flex size-full min-h-screen flex-col bg-[#111714] dark group/design-root overflow-x-hidden" style={{ fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
    <div className="layout-container flex h-full grow flex-col">
      <Header />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="@container">
            <div className="@[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
                style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(\'https://lh3.googleusercontent.com/aida-public/AB6AXuBtwhMFGiC3I3yqOZGILPP4pGEacwHOeFjm-9cN1-S1huggosRdxbqnXClrC1Qu3UY5ZhB5FtaYw7-0kLJcHkhtoZmahFQcpKvtKLhl4H0QaSL27fVV4jAQ76ByduRXF1IV4daeH5lLwrubHEnqywjeKdaoyqhxc0fB06RfY7jLQwo1VCJw-XflmxE7p86tah5zJse0h0T6vWnK8TlRSD5qqO_RSDlpwM5DT_0TY9SWyz2CrdrmuNxDoig4qVIRsUVdJ1COE3MCO1o\')' }}
              >
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Recorde os melhores momentos do seu futebol amador
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Grave, compartilhe, e transforme memórias em números e estatísticas.
                  </h2>
                </div>
                <div className="flex-wrap gap-3 flex justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#38e07b] text-[#111714] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <Link to="/register" className="truncate">
                      Registrar
                    </Link>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#29382f] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <Link to="/login" className="truncate">
                      Login
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
                >
                  Como funciona
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px]">Nossa plataforma permite gravar e registrar dados do seu futebol de forma prática, ágil e fácil.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3d5245] bg-[#1c2620] p-4 flex-col">
                  <div className="text-white" data-icon="VideoCamera" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M251.77,73a8,8,0,0,0-8.21.39L208,97.05V72a16,16,0,0,0-16-16H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V159l35.56,23.71A8,8,0,0,0,248,184a8,8,0,0,0,8-8V80A8,8,0,0,0,251.77,73ZM192,184H32V72H192V184Zm48-22.95-32-21.33V116.28L240,95Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">Grave as estatísticas das partidas</h2>
                    <p className="text-[#9eb7a8] text-sm font-normal leading-normal">Use nosso site para gravar os momentos épicos e memoráveis de jogos.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3d5245] bg-[#1c2620] p-4 flex-col">
                  <div className="text-white" data-icon="Users" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">Compartilhe com os amigos</h2>
                    <p className="text-[#9eb7a8] text-sm font-normal leading-normal">Compartilhe os stats com sua família, amigos e companheiros de time.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#3d5245] bg-[#1c2620] p-4 flex-col">
                  <div className="text-white" data-icon="Share" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">Reviva os registros</h2>
                    <p className="text-[#9eb7a8] text-sm font-normal leading-normal">Permita-se reconectar com momentos extraordinários através de números.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
                >
                  Features
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                  Explore as funcionalidades que tornam nossa plataforma única e essencial para todos os amantes do futebol amador.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    style={{ 
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1ethrMkevY92BYQJ_o41OpKSbgiWpt1HXcQvf9zfBzsujNtVU9jRQsluF7iIIildCF_mnEqgf5BWd9hKFoaJcNew69wmeWqPNtSNuTHeSysxyV5SGhYDy4YlWPI8LT_3QuEGV_7FXrcGK0sgJMofkOineVf8zbETDgiKWPxu1iG9XUExBETZVKUp7Gaeiobz7v1KeDYB8gr4fVjwO0zlzWeXVD2pXwrA3YCIQShVsiAivtRinPWKdkrrT4WRwhTfX7n3k72hTGuU')" 
                    }} 
                    ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">Registro fácil</p>
                    <p className="text-[#9eb7a8] text-sm font-normal leading-normal">Com poucos cliques atualize estatística de uma partida e de jogadores.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    style={{ 
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDIadRj2GyiRQm4tqXQPei-rogMTCnYbk58NCFMHYdYlOo5ozQEo73aOBRxUs0KSSSym-KmmCfyHOmybLMJ6JITs_yQUfyelKDNF62kGmi0pbyWiQPvn7NuKC_TuayMIaht6h5pFYwSyv7YbVQhJGt2JH4pBZGyWhsiYHU_R41GWaZprc37ghCHI_69HvhY_I1bDQf5HrB7eDlgZQPZF91IXtKcErWJaejYr-p8eBkUcvo-lZpWF0l80cxT2nJ9JSRMzd3SaGxXJus')"
                    }} ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">Compartilhamento</p>
                    <p className="text-[#9eb7a8] text-sm font-normal leading-normal">Através da nossa plataforma, com poucos cliques compartilhe os resultados com outras pessoas.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                    style={{ 
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCiMm3-sCLLCb15ALw4cyCKn_mew1cUtrnBQJyErrd_g2BPQfsCswU56ZSPtvOesF4jWkhUyS3S6k2R1xwfxVutRc9FKV-ERqw_3woVK6biERPnbBeFPaWlCPQOlc3WqOFkbAuXjk4HXPM6fup0Pi_YezO6GXE5kDr41Gl5w2V2FAUH2wyDv_4e3gAqrU8I4D95JYh2RaeudQeC6CmBsQ9WvIhHYTqAkO7yjpCynGIxT3MqpaSmXDOoQj8eAB4L3bQNyoJi0SNF0Uk')"
                    }} ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">Jogadores e Times </p>
                    <p className="text-[#9eb7a8] text-sm font-normal leading-normal">
                      Gerencie jogadores e times facilmente, mantendo todos os dados organizados e acessíveis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
);

export default Home;
