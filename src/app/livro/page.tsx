"use client"
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import BookCard from "@/app/components/card"; 
import "@/app/globals.css";
import "@/app/page.css";

export default function Livro() {
  const [books, setBooks] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q");

  useEffect(() => {
    if (searchTerm) {
      const fetchBooks = async () => {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`
          );
          const allBooks = response.data.items || [];

          const exactMatch = allBooks.filter((book: any) =>
            book.volumeInfo.title.toLowerCase() === searchTerm.toLowerCase()
          );

          if (exactMatch.length > 0) {
            setBooks(exactMatch);
          } else {
            const partialMatch = allBooks.filter((book: any) =>
              book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setBooks(partialMatch);
          }
        } catch (error) {
          console.error("Erro ao buscar livros:", error);
        }
      };

      fetchBooks();
    }
  }, [searchTerm]);

  return (
    <>
      <Header onSearch={setBooks} />
      <main>
        <div className="book-results">
          {books.length > 0 ? (
            <div className="book-list">
              {books.map((book: any) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p>Nenhum livro encontrado. Tente outra pesquisa.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
