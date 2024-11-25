"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/Header.css";

export default function Header({ onSearch }: { onSearch: (books: any[]) => void }) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado local para o termo de busca
  const router = useRouter(); // Instância do router para navegação

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

  return (
    <header>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/abaLivros">Livros</a></li>
          <li><a href="/abaAutores">Autores</a></li>
          <li><a href="#">Editoras</a></li>
          <li><a href="#">Lançamentos</a></li>
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
        <div className="entrar">
          <a href="/login"><button type="button">Entrar</button></a>
          <a href="/create"><button type="button">Cadastre-se</button></a>
        </div>
      </nav>
    </header>
  );
}
