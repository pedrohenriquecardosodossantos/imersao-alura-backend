// Importa a função 'conectarAoBanco' para estabelecer a conexão com o banco de dados.
// A função está localizada no arquivo dbconfig.js.
//import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbconfig.js';

// Estabelece a conexão com o banco de dados, utilizando a string de conexão fornecida pela variável de ambiente 'STRING_CONEXAO'.
// A string de conexão contém informações como o nome do servidor, banco de dados, usuário e senha.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados.
export async function getTodosPosts() {
  // Obtém o banco de dados 'imersao-instabyte' da conexão estabelecida.
  const db = conexao.db('imersao-instabyte');

  // Obtém a coleção 'posts' do banco de dados.
  // Uma coleção é semelhante a uma tabela em um banco de dados relacional.
  const colecao = db.collection('posts');

  // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados em um array.
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post no banco de dados.
export async function criarPost(novoPost) {
  // Obtém o banco de dados 'imersao-instabyte' da conexão estabelecida.
  const db = conexao.db('imersao-instabyte');

  // Obtém a coleção 'posts' do banco de dados.
  const colecao = db.collection('posts');

  // Insere um novo documento (post) na coleção e retorna um objeto com informações sobre a inserção.
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db('imersao-instabyte');

  const colecao = db.collection('posts');

  const objID = ObjectId.createFromHexString(id);

  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}
