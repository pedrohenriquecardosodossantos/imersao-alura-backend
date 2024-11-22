// Importa o módulo fs para realizar operações com o sistema de arquivos.
import fs from 'fs';

import gerarDescricaoComGemini from '../services/geminiService.js';

// Importa funções do modelo de posts para interagir com o banco de dados:
//  - getTodosPosts: Obtém todos os posts do banco de dados.
//  - criarPost: Cria um novo post no banco de dados.
import { getTodosPosts, criarPost, atualizarPost, } from '../models/postsModel.js';

// Função assíncrona para listar todos os posts.
export async function listarPosts(req, res) {
  // Chama a função getTodosPosts para obter todos os posts do banco de dados.
  const posts = await getTodosPosts();

  // Envia uma resposta HTTP com status 200 (OK) e os posts em formato JSON.
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post.
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post a partir do corpo da requisição.
  const novoPost = req.body;

  // Tenta criar o novo post:
  try {
    // Chama a função criarPost para inserir o novo post no banco de dados.
    const postCriado = await criarPost(novoPost);

    // Envia uma resposta HTTP com status 200 (OK) e o post criado em formato JSON.
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, registra o erro no console e envia uma resposta com status 500 (Erro interno do servidor).
    console.error(erro.message);
    res.status(500).json({'Erro': 'Falhou na requisição'});
  }
}

// Função assíncrona para fazer o upload de uma imagem e criar um novo post.
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome da imagem.
  const novoPost = {
    descricao: '',
    imgUrl: req.file.originalname,
    alt: ''
  };

  // Tenta criar o novo post e renomear a imagem:
  try {
    // Chama a função criarPost para inserir o novo post no banco de dados e obtém o ID do post inserido.
    const postCriado = await criarPost(novoPost);

    // Constrói o novo nome da imagem, utilizando o ID do post.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo da imagem para o novo nome.
    fs.renameSync(req.file.path, imagemAtualizada);

    // Envia uma resposta HTTP com status 200 (OK) e o post criado em formato JSON.
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, registra o erro no console e envia uma resposta com status 500 (Erro interno do servidor).
    console.error(erro.message);
    res.status(500).json({'Erro': 'Falhou na requisição'});
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  try {
      const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
      const descricao = await gerarDescricaoComGemini(imgBuffer);

      const post = {
          imgUrl: urlImagem,
          descricao: descricao,
          alt: req.body.alt
      }

      const postCriado = await atualizarPost(id, post);
      res.status(200).json(postCriado);  
  } catch(erro) {
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"});
  }
}
