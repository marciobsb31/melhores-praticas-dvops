const request = require('supertest');
const app = require('../src/app');

describe('DevOps CI/CD Unit & Integration Tests - Unyleya Unidade 2', () => {

  describe('GET /api/health', () => {
    it('deve retornar status UP e código HTTP 200', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('UP');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('GET /api/info', () => {
    it('deve retornar as informações de autoria de Márcio Pereira e pipeline', async () => {
      const response = await request(app).get('/api/info');
      expect(response.status).toBe(200);
      expect(response.body.author).toBe('Márcio Pereira');
      expect(response.body.githubRepo).toBe('https://github.com/marciobsb31/melhores-praticas-dvops');
      expect(response.body.pipelineName).toBe('pipeline-marcio-melhores-praticas-devops');
      expect(response.body).toHaveProperty('qualityGate');
      expect(response.body).toHaveProperty('deployType');
    });
  });

  describe('POST /api/math/calc - Operações Matemáticas', () => {
    it('deve realizar adição corretamente', async () => {
      const response = await request(app)
        .post('/api/math/calc')
        .send({ a: 10, b: 25, op: 'add' });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(35);
    });

    it('deve realizar subtração corretamente', async () => {
      const response = await request(app)
        .post('/api/math/calc')
        .send({ a: 50, b: 18, op: 'sub' });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(32);
    });

    it('deve realizar multiplicação corretamente', async () => {
      const response = await request(app)
        .post('/api/math/calc')
        .send({ a: 7, b: 8, op: 'mul' });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(56);
    });

    it('deve realizar divisão corretamente', async () => {
      const response = await request(app)
        .post('/api/math/calc')
        .send({ a: 100, b: 4, op: 'div' });
      expect(response.status).toBe(200);
      expect(response.body.result).toBe(25);
    });

    it('deve retornar erro 400 ao tentar divisão por zero', async () => {
      const response = await request(app)
        .post('/api/math/calc')
        .send({ a: 10, b: 0, op: 'div' });
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Divisão por zero');
    });

    it('deve retornar erro 400 com valores não numéricos', async () => {
      const response = await request(app)
        .post('/api/math/calc')
        .send({ a: 'invalido', b: 10, op: 'add' });
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('números');
    });

    it('deve retornar erro 400 com operação desconhecida', async () => {
      const response = await request(app)
        .post('/api/math/calc')
        .send({ a: 5, b: 5, op: 'potencia' });
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Operação inválida');
    });
  });

  describe('GET Wildcard Fallback Route', () => {
    it('deve retornar o index.html em rotas desconhecidas', async () => {
      const response = await request(app).get('/qualquer-outra-rota');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
    });
  });

});

