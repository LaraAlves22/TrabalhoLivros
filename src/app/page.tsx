"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import book from '/public/book.png';
import '@/styles/Login.css';

export default function Login() {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        localStorage.setItem("user", formData.name); // Salva o nome do usuário no localStorage
        router.push("/home"); // Redireciona para a página HomeLog após o login
      } else {
        setMessage(data.error || 'Erro desconhecido.');
      }
    } catch (error) {
      setMessage('Erro ao se conectar ao servidor.');
    }
  };

  return (
    <div className="login-form-container">
      <div>
        <Image className="logo" src={book} alt="Logo livro" width={80} />
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn-login">
            Login
          </button>
          {message && <p className="message">{message}</p>}
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
