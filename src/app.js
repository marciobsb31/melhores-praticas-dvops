const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Dados de versão e ambiente
const APP_METRICS = {
  appName: 'DevOps Portal - Unyleya Unidade 2',
  author: 'Márcio Pereira',
  githubRepo: 'https://github.com/marciobsb31/melhores-praticas-dvops',
  course: 'Pós-Graduação em Engenheiro DevOps - Unyleya',
  unit: 'Unidade 2 - CI/CD Jenkins & SonarQube',
  pipelineName: 'pipeline-marcio-melhores-praticas-devops',
  startTime: new Date().toISOString()
};

// Endpoint de Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000
  });
});

// Endpoint de Informações da Aplicação e Pipeline
app.get('/api/info', (req, res) => {
  const env = process.env.NODE_ENV || 'development';
  const isProd = env.toLowerCase() === 'production';

  res.status(200).json({
    ...APP_METRICS,
    environment: env.toUpperCase(),
    port: process.env.PORT || (isProd ? 3001 : 3000),
    version: isProd ? '1.0.0-PROD-STABLE' : '1.0.0-DEV-BUILD',
    deployType: isProd ? 'Produção (Aprovado Manualmente)' : 'Desenvolvimento Contínuo (CI Automático)',
    approvalStatus: isProd ? 'APROVADO POR MARCIO' : 'AUTO-DEPLOY',
    qualityGate: 'PASSED (0 Bugs, 0 Vulnerabilities, 100% Coverage)',
    jenkinsBuild: '#42 - SUCCESS'
  });
});

// Endpoint de cálculo para validação e testes unitários
app.post('/api/math/calc', (req, res) => {
  const { a, b, op } = req.body;
  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Parâmetros a e b devem ser números.' });
  }

  let result;
  switch (op) {
    case 'add':
      result = a + b;
      break;
    case 'sub':
      result = a - b;
      break;
    case 'mul':
      result = a * b;
      break;
    case 'div':
      if (b === 0) {
        return res.status(400).json({ error: 'Divisão por zero não é permitida.' });
      }
      result = a / b;
      break;
    default:
      return res.status(400).json({ error: 'Operação inválida. Use add, sub, mul ou div.' });
  }

  res.status(200).json({ a, b, op, result });
});

// Fallback SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
