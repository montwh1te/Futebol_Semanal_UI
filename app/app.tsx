import { Route, Routes } from "react-router-dom";
import Home from "./routes/home";

import Login from "./routes/Usuarios/Login";
import Register from "./routes/Usuarios/Register";
import Profile from "./routes/Usuarios/Profile";

import CriarTime from "./routes/Times/CriarTime";
import TimesInfo from "./routes/Times/TimesInfo";
import TimeInfo from "./routes/Times/TimeInfo";

import CriarJogador from "./routes/Jogadores/CriarJogador";
import JogadoresInfo from "./routes/Jogadores/JogadoresInfo";
import JogadorInfo from "./routes/Jogadores/JogadorInfo";

import CriarPartida from "./routes/Partidas/CriarPartida";
import PartidasInfo from "./routes/Partidas/PartidasInfo";
// import PartidaInfo from "./routes/Partidas/PartidaInfo";

// import CriarEstatistica from "./routes/Estatisticas/CriarEstatistica";
// import EstatisticasInfo from "./routes/Estatisticas/EstatisticasInfo";
// import EstatisticaInfo from "./routes/Estatisticas/EstatisticaInfo";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} /> {/* PRONTO */}
      <Route path="/login" element={<Login />} /> {/* PRONTO */}
      <Route path="/register" element={<Register />} /> {/* PRONTO */}
      <Route path="/profile/:usuarioId" element={<Profile />} /> {/* PRONTO */}

      <Route path=":usuarioId/times/criar-time" element={<CriarTime />} />
      <Route path=":usuarioId/times" element={<TimesInfo />} />
      <Route path=":usuarioId/times/:timeId" element={<TimeInfo />} />

      <Route path=":usuarioId/times/:timeId/criar-jogador" element={<CriarJogador />} />
      <Route path=":usuarioId/times/:timeId/jogadores" element={<JogadoresInfo />} />
      <Route path=":usuarioId/times/:timeId/jogadores/:jogadorId" element={<JogadorInfo />} />

      <Route path=":usuarioId/times/:timeId/criar-partida" element={<CriarPartida />} />
      <Route path=":usuarioId/times/:timeId/partidas" element={<PartidasInfo />} />
      
      {/* <Route path=":usuarioId/times/:timeId/partidas/:partidaId" element={<PartidaInfo />} /> */}

      {/* <Route path=":usuarioId/times/:partidaId/criar-estatistica" element={<CriarEstatistica />} />
      <Route path=":usuarioId/times/:timeId/partidas/:partidaId/estatisticas" element={<EstatisticasInfo />} />
      <Route path=":usuarioId/times/:timeId/partidas/:partidaId/estatisticas/:estatisticaId" element={<EstatisticaInfo />} /> */}

    </Routes>
  );
}

export default App;