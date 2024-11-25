import Image from "next/image";
import Link from "next/link";
import book from '/public/book.png'
import '@/styles/Login.css'
export default function Login(){

  return (
    <div className="login-form-container">
        <div>
        <Image className="logo" src={book} alt="Logo livro" width={80}/>
          
          <h2>Login</h2>
          <form className="login-form">
            <input
              type="text"
              name="name"
              placeholder="Nome"
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
            />
            <button type="submit" className="btn-login">
              Login
            </button>

            <p>
              Não tem login?{" "}
              <Link
                href="/create"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
    </div>
  );
}