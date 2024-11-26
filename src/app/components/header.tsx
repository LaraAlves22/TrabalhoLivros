"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/Header.css";


export default function Header({ onSearch }: { onSearch: (books: any[]) => void }) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado local para o termo de busca
  const [user, setUser] = useState<string | null>(null); // Estado para o nome do usuário
  const router = useRouter(); // Instância do router para navegação

  useEffect(() => {
    // Verifica se o usuário está logado, lendo do localStorage
    const loggedInUser = localStorage.getItem("user"); // Obtém o nome do usuário do localStorage
    if (loggedInUser) {
      setUser(loggedInUser); // Atualiza o estado com o nome do usuário
    }
  }, []); // A dependência vazia garante que o efeito seja executado uma vez na montagem

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    if (!searchTerm.trim()) return;

    try {
      const queryParam = encodeURIComponent(searchTerm); // Codifica o termo de pesquisa
      router.push(`/livro?q=${queryParam}`); // Redireciona diretamente para a URL com a query
    } catch (error) {
      console.error("Erro ao redirecionar para a página de resultados:", error);
    }
  };

  const handleLogout = () => {
    // Faz o logout, removendo o usuário do localStorage
    localStorage.removeItem("user");
    setUser(null); // Limpa o estado do usuário
    router.push("/"); // Redireciona para a página de login após o logout
  };

  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/abaLivros">Livros</a></li>
          <li><a href="/abaAutores">Autores</a></li>
          <li><a href="#">Editoras</a></li>
          <li><a href="#">Lançamentos</a></li>
          <li><a href="#">Estante</a></li>
        </ul>
        <div className="form-container">
          <form className="barra-pesquisa" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Busque um livro"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>
        <div className="profile-container">
          {user ? (
            <div className="profile">
              <span className="profile-icon">👤</span>
              <span>{user}</span>
              <button onClick={handleLogout}>Sair</button>
            </div>
          ) : null} {/* Não exibe nada caso o usuário não esteja logado */}
        </div>
      </nav>
    </header>
  );
}
