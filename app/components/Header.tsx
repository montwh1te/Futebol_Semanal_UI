import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import { logout } from "../services/authService";
import { getUserIdFromToken } from "../services/useAuth";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const usuarioId = getUserIdFromToken();
  if (!usuarioId) return;

  const handleLogout = () => {
    logout();
    navigate("/login");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#29382f] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Futebol Semanal</h2>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link className="text-white text-sm font-medium leading-normal" to="/">Home</Link>
          <Link className="text-white text-sm font-medium leading-normal" to="/">Sobre</Link>
          <Link className="text-white text-sm font-medium leading-normal" to="/">Contate-nos</Link>

          {isAuthenticated && (
            <>
              <Link
                className="text-white text-sm font-medium leading-normal"
                to={`/${usuarioId}/times`}
              >
                Meus Times
              </Link>
              <Link
                className="text-white text-sm font-medium leading-normal"
                to={`/profile/${usuarioId}`}
              >
                Meu Perfil
              </Link>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {!isAuthenticated ? (
            <>
              <Link to="/register">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#38e07b] text-[#111714] text-sm font-bold leading-normal tracking-[0.015em]">
                  Registrar
                </button>
              </Link>
              <Link to="/login">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#29382f] text-white text-sm font-bold leading-normal tracking-[0.015em]">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e03c3c] text-white text-sm font-bold leading-normal tracking-[0.015em]">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
