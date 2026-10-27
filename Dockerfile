# Multi-stage Dockerfile para aplicação Node.js DevOps Unyleya
FROM node:18-alpine AS base
WORKDIR /app

# Instalação de dependências de produção
COPY package*.json ./
RUN npm ci --only=production

# Cópia do código fonte
COPY src ./src
COPY public ./public

# Configurações de execução
EXPOSE 3000 3001
USER node

CMD ["node", "src/server.js"]
