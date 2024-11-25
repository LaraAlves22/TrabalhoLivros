"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import "@/app/globals.css";
import "@/app/page.css";
import axios from "axios";
import BookCard from "@/app/components/card"; // Importando o componente BookCard

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);

  // Alteração: Usaremos um useEffect para carregar os livros mais populares
  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        // Fazendo uma requisição para a API do Google Books (ou outra de sua escolha)
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=10`
        );
        const allBooks = response.data.items || [];
        setBooks(allBooks); // Carrega os livros mais lidos
      } catch (error) {
        console.error("Erro ao buscar livros populares:", error);
      }
    };

    fetchPopularBooks();
  }, []); // A requisição é feita uma vez, quando o componente é montado

  return (
    <>
      <Header />

      <main>
        <div className="banner">
          <section className="image-banner">
            <img
              src="https://ccreadysites.cyberchimps.com/bookstore/wp-content/uploads/sites/166/2022/01/bookstore-hero.png"
              alt="Imagem de Livros"
            />
          </section>
          <section className="texto-banner">
            <h1>Os melhores livros só aqui</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </section>
        </div>

        <h1>Melhores leituras do mês</h1>

        <div className="book-results">
          {books.length > 0 ? (
            <div className="book-list">
              {books.map((book: any) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p>Carregando livros populares...</p> // Exibe uma mensagem enquanto os livros são carregados
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
