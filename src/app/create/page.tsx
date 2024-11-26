"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import book from '/public/book.png';
import '@/styles/Create.css';

export default function Create() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConfirm: '',
    password: '',
    passwordConfirm: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações simples
    if (formData.password !== formData.passwordConfirm) {
      setMessage('As senhas não coincidem.');
      return;
    }
    if (formData.email !== formData.emailConfirm) {
      setMessage('Os emails não coincidem.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Erro desconhecido.');
      }
    } catch (error) {
      setMessage('Erro ao se conectar ao servidor.');
    }
  };

  return (
    <div className="cadastro-form-container">
      <div>
        <Image src={book} alt="Logo livro" width={80} />
        <h2>Cadastro</h2>
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="email"
            name="emailConfirm"
            placeholder="Confirme o Email"
            required
            value={formData.emailConfirm}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirme a Senha"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
          <button type="submit" className="btn-cadastro">
            Cadastrar
          </button>
          {message && <p className="message">{message}</p>}
          <p>
            Já tem uma conta?{" "}
            <Link
              href="/"
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
