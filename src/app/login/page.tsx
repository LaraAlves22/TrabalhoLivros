import Image from "next/image";
import Link from "next/link";
import book from '/public/book.png'
import '@/styles/Login.css'
export default function Login(){
    {/*e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        name,
        password,
      });

      setUser(response.data); // Define o usuário logado
      setError(""); // Limpa erros anteriores
    } catch (error) {
      if (!error?.response) {
        setError("Erro ao acessar servidor.");
      } else if (error.response.status === 401) {
        setError("Nome do Usuario ou senha inválidos.");
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setError("");
  };*/}

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
                href="/cadastro"
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