"use client";

import { useState } from "react";
import axios from "axios";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import BookCard from "@/app/components/card";
import '@/styles/AbaAutores.css'

export default function AbaLivros() {
  const [livros, setLivros] = useState<any[]>([]);
  const [pesquisaAutor, setPesquisaAutor] = useState<string>(""); // Estado para o nome do autor
  const [letraSelecionada, setLetraSelecionada] = useState<string | null>(null); // Estado para a letra selecionada

  const buscarLivros = async (query: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=40` // Aumentei o limite para buscar mais resultados
      );
      setLivros(response.data.items || []); // Atualiza os livros com a resposta da API
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setLivros([]); // Garante que a lista seja limpa caso ocorra erro
    }
  };

  // Pesquisa por autor completo
  const buscarPorAutor = () => {
    if (pesquisaAutor.trim()) {
      setLetraSelecionada(null); // Reseta a seleção de letras
      buscarLivros(`inauthor:${pesquisaAutor}`); // Pesquisa pelo autor completo
    }
  };

  // Pesquisa pela primeira letra do primeiro nome do autor
  const buscarPorLetra = (letra: string) => {
    setLetraSelecionada(letra);
    setPesquisaAutor(""); // Reseta a pesquisa de nome de autor
    buscarLivros(`inauthor:${letra}*`); // Pesquisa autores que começam com a letra selecionada
  };

  // Filtra os livros com base na primeira letra do primeiro nome do autor
  const filtrarLivrosPorLetra = (livros: any[], letra: string) => {
    return livros.filter((livro) => {
      if (livro.volumeInfo.authors) {
        const primeiroNome = livro.volumeInfo.authors[0].split(" ")[0]; // Pega o primeiro nome
        return primeiroNome.charAt(0).toUpperCase() === letra.toUpperCase(); // Compara a primeira letra
      }
      return false;
    });
  };

  const livrosFiltrados = letraSelecionada
    ? filtrarLivrosPorLetra(livros, letraSelecionada) // Filtra se uma letra foi selecionada
    : livros;

  return (
    <div>
      <Header />
      <main>
        <h1>Autores</h1>

        {/* Pesquisa por Autor */}
        <div className="pesquisa-autor">
          <input
            type="text"
            placeholder="Pesquisar por autor"
            value={pesquisaAutor}
            onChange={(e) => setPesquisaAutor(e.target.value)}
          />
          <button onClick={buscarPorAutor}>Pesquisar</button>
        </div>

        {/* Filtro por Letra (Usando Select) */}
        <div className="filtro-letras">
          <label htmlFor="letra">Filtrar por Letra: </label>
          <select
            id="letra"
            value={letraSelecionada || ""}
            onChange={(e) => buscarPorLetra(e.target.value)}
          >
            <option value="">Selecione uma letra</option>
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letra) => (
              <option key={letra} value={letra}>
                {letra}
              </option>
            ))}
          </select>
        </div>

        {/* Exibição dos Livros */}
        <section>
          <div className="livros-container">
            {livrosFiltrados.length > 0 ?  (
              <div className="book-list">
                {livrosFiltrados.map((livro: any) => (
                  <BookCard key={livro.id} book={livro} />
                ))}
              </div>
            ) : (
              (letraSelecionada || pesquisaAutor) && (
                <p>Nenhum livro encontrado.</p>
              )
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
