"use client";

import { useState } from "react";
import axios from "axios";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import BookCard from "@/app/components/card";
import "@/styles/AbaLivros.css";

export default function AbaLivros() {
  const [livros, setLivros] = useState<any[]>([]);
  const [generoSelecionado, setGeneroSelecionado] = useState<string | null>(null);

  // Mapeamento dos gêneros em português para inglês
  const generos = [
    { label: "Ficção", value: "Fiction" },
    { label: "Romance", value: "Romance" },
    { label: "Fantasia", value: "Fantasy" },
    { label: "Biografias e Autobiografias", value: "Biography & Autobiography" },
    { label: "Computação", value: "Computers" },
    { label: "Culinária", value: "Cooking" },
    { label: "Religião", value: "Religion" },
    { label: "Música", value: "Music" },
    { label: "Saúde e Bem-estar", value: "Health & Fitness" },
    { label: "Livros Infantis", value: "Juvenile Fiction" },
  ];

  const buscarLivrosPorGenero = async (genero: string) => {
    try {
      setGeneroSelecionado(genero); // Atualiza o gênero selecionado
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
          genero
        )}&maxResults=20`
      );
      setLivros(response.data.items || []); // Atualiza os livros com a resposta da API
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setLivros([]); // Garante que a lista seja limpa caso ocorra erro
    }
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Gêneros Literários</h1>

        {/* Navegação dos Gêneros */}
        <nav className="generos_total">
          <ul className="ul_generos">
            {generos.map((genero, index) => (
              <li key={index}>
                <button
                  className="generos"
                  onClick={() => buscarLivrosPorGenero(genero.value)}
                >
                  {genero.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Exibição dos Livros */}
        <section>
          <div className="livros-container">
            {livros.length > 0 ? (
              <div className="book-list">
                {livros.map((livro: any) => (
                  <BookCard key={livro.id} book={livro} />
                ))}
              </div>
            ) : (
              generoSelecionado && <p>Nenhum livro encontrado para "{generoSelecionado}".</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
