import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const { name, password } = await req.json();

  const filePath = path.join(process.cwd(), 'data', 'users.json'); // Caminho do arquivo JSON
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const user = data.find(user => user.name === name && user.password === password);

  if (user) {
    return new Response(JSON.stringify({ message: 'Login realizado com sucesso!' }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: 'Nome ou senha inválidos' }), { status: 401 });
  }
}
