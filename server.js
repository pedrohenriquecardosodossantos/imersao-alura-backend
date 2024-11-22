// Importa o framework Express, que será utilizado para criar a aplicação web.
import express from 'express';

// Importa as rotas definidas no arquivo 'postsRoutes.js'.
// Este arquivo provavelmente contém as definições das rotas para lidar com os posts.
import routes from './src/routes/postsRoutes.js';

// Cria uma instância do Express, que será o ponto de partida da aplicação.
const app = express();

app.use(express.static('uploads'));

// Chama a função 'routes' passando a instância da aplicação como argumento.
// Isso irá configurar as rotas da aplicação, definindo como as requisições HTTP serão tratadas.
routes(app);

// Inicia o servidor Express na porta 3000.
// Quando o servidor estiver pronto para receber requisições, uma mensagem será exibida no console.
app.listen(3000, () => {
  console.log('Servidor escutando...');
});
