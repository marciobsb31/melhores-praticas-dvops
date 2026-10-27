const app = require('./app');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 [${ENV.toUpperCase()}] Servidor iniciado com sucesso!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`👨‍💻 Aluno: Márcio Pereira | DevOps Unyleya Unidade 2`);
  console.log(`⚙️  Pipeline: pipeline-marcio-melhores-praticas-devops`);
  console.log(`=======================================================`);
});

process.on('SIGTERM', () => {
  console.log('Recebido sinal SIGTERM, encerrando servidor...');
  server.close(() => {
    console.log('Servidor encerrado.');
  });
});
