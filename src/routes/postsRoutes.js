// Importa o framework Express para criar a aplicação web.
import express from 'express';

// Importa o middleware Multer para lidar com o upload de arquivos.
import multer from 'multer';

import cors from 'cors';

// Importa funções do controlador de posts para lidar com as rotas relacionadas a posts:
//  - listarPosts: Lista todos os posts existentes.
//  - postarNovoPost: Cria um novo post.
//  - uploadImagem: Faz o upload de uma imagem para um post.
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200
}

// Configura o armazenamento em disco para o Multer:
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados.
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define o nome do arquivo carregado, mantendo o nome original.
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer com a configuração de armazenamento definida.
const upload = multer({ storage });

// Define uma função chamada 'routes' que recebe a aplicação Express como argumento.
const routes = (app) => {
  // Habilita o middleware 'express.json()' para permitir que a aplicação receba dados no formato JSON nas requisições.
  app.use(express.json());

  app.use(cors(corsOptions));

  // Define uma rota GET para o endpoint '/posts', que será tratada pela função 'listarPosts'.
  app.get('/posts', listarPosts);

  // Define uma rota POST para o endpoint '/posts', que será tratada pela função 'postarNovoPost'.
  app.post('/posts', postarNovoPost);

  // Define uma rota POST para o endpoint '/upload':
  // - Utiliza o middleware 'upload.single('imagem')' para lidar com um único arquivo chamado 'imagem'.
  // - Após o upload bem-sucedido, chama a função 'uploadImagem'.
  app.post('/upload', upload.single('imagem'), uploadImagem);

  app.put('/upload/:id', atualizarNovoPost);
};

// Exporta a função 'routes' como padrão, permitindo que outros arquivos a importem.
export default routes;
