import Image from "next/image";
import Link from "next/link";
import book from '/public/book.png'
import '@/styles/Create.css'

export default function Create(){

  return (
    <div className="cadastro-form-container">
        <div>
          <Image src={book} alt="Logo livro" width={80} />
          <h2>Cadastro</h2>
          <form className="cadastro-form">
            <input
              type="text"
              name="name"
              placeholder="Nome"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              type="email"
              name="emailConfirm"
              placeholder="Confirme o Email"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
            />
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirme a Senha"
            />
            <button type="submit" className="btn-cadastro">
              Cadastrar
            </button>
            <p>
              Já tem uma conta?{" "}
              <Link
                href="/login"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Faça login
              </Link>
            </p>
          </form>
        </div>
    </div>
  );
}