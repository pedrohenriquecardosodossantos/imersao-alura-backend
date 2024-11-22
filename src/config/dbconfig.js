// **Função para estabelecer conexão com um banco de dados MongoDB**
// Esta função utiliza a biblioteca MongoDB Node.js Driver para conectar-se a um banco de dados MongoDB.
// Ela recebe como parâmetro uma string de conexão que contém as informações necessárias para estabelecer a conexão.
// A função retorna um objeto MongoClient que pode ser utilizado para realizar operações no banco de dados.

import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
  // Variável para armazenar o cliente MongoDB
  let mongoClient;

  try {
    // Cria um novo cliente MongoDB usando a string de conexão fornecida
    mongoClient = new MongoClient(stringConexao);
    // Exibe uma mensagem no console indicando que a conexão está sendo estabelecida
    console.log('Conectando ao cluster do banco de dados...');
    // Tenta estabelecer a conexão com o banco de dados
    await mongoClient.connect();
    // Exibe uma mensagem de sucesso caso a conexão seja estabelecida
    console.log('Conectado ao MongoDB Atlas com sucesso!');
    // Retorna o cliente MongoDB para que possa ser utilizado em outras partes do código
    return mongoClient;
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante a conexão
    console.error('Falha na conexão com o banco!', erro);
    // Encerra a aplicação em caso de erro na conexão
    process.exit();
  }
}
