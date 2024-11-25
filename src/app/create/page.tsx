import Image from "next/image";
import Link from "next/link";
import book from '/public/book.png'
import '@/styles/Create.css'

export default function Create(){
    {/*const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState(""); // Novo estado para o email de confirmação
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState(""); // Novo estado para a confirmação de senha
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    // Validação do email
    if (email !== emailConfirm) {
      setError("Os e-mails não coincidem.");
      return;
    }

    // Validação da senha
    if (password !== passwordConfirm) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        name,
        email,
        password,
      });

      setSuccess(true);
      setError("");

      // Redireciona para o login após 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Este email já está cadastrado.");
      } else {
        setError("Erro ao tentar realizar o cadastro.");
      }
    }
  };*/}

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