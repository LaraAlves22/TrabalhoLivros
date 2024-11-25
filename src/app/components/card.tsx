import { useState } from "react";
import Modal from "./modal";
import '@/styles/Card.css';

interface BookCardProps {
  book: any;
}

const Card: React.FC<BookCardProps> = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="book-card" onClick={openModal}>
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/128x192.png?text=Sem+Imagem"
          }
          alt={book.volumeInfo.title || "Sem título"}
        />
        <h3>{book.volumeInfo.title}</h3>
        <p>{book.volumeInfo.authors?.join(", ") || "Autor desconhecido"}</p>
        <p>
          {book.saleInfo?.listPrice?.amount
            ? `R$ ${book.saleInfo.listPrice.amount.toFixed(2)}`
            : "Valor indisponível"}
        </p>
        <button>Adicionar à minha estante</button>
      </div>
      {showModal && <Modal book={book} onClose={closeModal} />}
    </>
  );
};

export default Card;
