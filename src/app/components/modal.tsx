import '@/styles/Modal.css';

interface ModalProps {
    book: any;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ book, onClose }) => {
    const price = book.saleInfo?.listPrice?.amount 
        ? `R$ ${book.saleInfo.listPrice.amount.toFixed(2)}`
        : "Valor indisponível";

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>{book.volumeInfo.title}</h2>
                <img
                    src={
                        book.volumeInfo.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/128x192.png?text=Sem+Imagem"
                    }
                    alt={book.volumeInfo.title || "Sem título"}
                />
                <p><strong>Autor(es):</strong> {book.volumeInfo.authors?.join(", ") || "Autor desconhecido"}</p>
                <p><strong>Descrição:</strong> {book.volumeInfo.description || "Sem descrição disponível."}</p>
                <p><strong>Data de publicação:</strong> {book.volumeInfo.publishedDate || "Data desconhecida"}</p>
                <p><strong>Preço:</strong> {price}</p>

                <button id='add'>Adicionar à minha estante</button>
            </div>
        </div>
    );
};

export default Modal;
