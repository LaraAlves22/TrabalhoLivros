import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const { name, email, password, emailConfirm, passwordConfirm } = await req.json();

  // Validando os campos
  if (!name || !email || !password || !emailConfirm || !passwordConfirm) {
    return new Response(JSON.stringify({ error: 'Todos os campos são obrigatórios.' }), { status: 400 });
  }

  if (password !== passwordConfirm) {
    return new Response(JSON.stringify({ error: 'As senhas não coincidem.' }), { status: 400 });
  }

  if (email !== emailConfirm) {
    return new Response(JSON.stringify({ error: 'Os emails não coincidem.' }), { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'data', 'users.json'); // Caminho do arquivo JSON

  // Lê os dados existentes
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro ao ler os dados.' }), { status: 500 });
  }

  // Verifica se o email já está registrado
  if (data.some(user => user.email === email)) {
    return new Response(JSON.stringify({ error: 'Email já cadastrado.' }), { status: 409 });
  }

  // Adiciona o novo usuário sem criptografar a senha
  try {
    const newUser = { name, email, password }; // Salva a senha em texto simples

    data.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ message: 'Usuário registrado com sucesso!' }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro ao salvar os dados.' }), { status: 500 });
  }
}
