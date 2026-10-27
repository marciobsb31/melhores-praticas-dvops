# 📜 Comandos Utilizados no GIT - Unyleya (Unidade 2)

**Curso:** Pós-Graduação em Engenheiro DevOps  
**Disciplina / Unidade:** Unidade 2 - Ferramentas de CI/CD (Jenkins e Hudson), Git e SonarQube  
**Aluno:** Márcio Pereira  
**Email:** `cgti.fabricapositivo.dev3@pgfn.gov.br`  
**Repositório Remoto:** [https://github.com/marciobsb31/melhores-praticas-dvops](https://github.com/marciobsb31/melhores-praticas-dvops)  

---

## 📌 1. Apresentação

Este documento atende à solicitação prática da Unidade 2, detalhando todos os comandos Git executados ao longo do ciclo de desenvolvimento, versionamento e automação da esteira de CI/CD do projeto **melhores-praticas-dvops**.

---

## 🚀 2. Sequência Cronológica de Comandos Executados

### Etapa 2.1: Clonagem e Verificação da Conexão Remota

Para conectar o ambiente local ao repositório remoto criado no GitHub:

```bash
# 1. Clonar o repositório remoto do GitHub
git clone https://github.com/marciobsb31/melhores-praticas-dvops.git

# 2. Entrar no diretório do projeto clonado
cd melhores-praticas-dvops

# 3. Listar as URLs dos repositórios remotos configurados (fetch e push)
git remote -v
```

**Saída obtida:**
```text
origin  https://github.com/marciobsb31/melhores-praticas-dvops.git (fetch)
origin  https://github.com/marciobsb31/melhores-praticas-dvops.git (push)
```

---

### Etapa 2.2: Configuração de Identidade do Aluno

Configuração do nome e email do autor para assegurar a rastreabilidade e autoria dos commits:

```bash
# 4. Configurar o nome do desenvolvedor/aluno
git config user.name "Márcio Pereira"

# 5. Configurar o email institucional do desenvolvedor
git config user.email "cgti.fabricapositivo.dev3@pgfn.gov.br"

# 6. Validar as configurações aplicadas
git config --list | grep user
```

**Saída obtida:**
```text
user.name=Márcio Pereira
user.email=cgti.fabricapositivo.dev3@pgfn.gov.br
```

---

### Etapa 2.3: Criação da Estrutura e Inclusão de Arquivos no Stage

Criação da aplicação Node.js/Express, testes automatizados Jest, Jenkinsfile, arquivos SonarQube e Docker Compose:

```bash
# 7. Verificar o status dos arquivos modificados e não rastreados
git status

# 8. Criar o arquivo .gitignore para evitar inclusão de dependências e binários pesados
echo "node_modules/" >> .gitignore
echo "coverage/" >> .gitignore
echo "*.log" >> .gitignore

# 9. Adicionar todos os arquivos do projeto à área de preparação (staging area)
git add .

# 10. Confirmar que os arquivos foram devidamente indexados
git status -s
```

**Saída obtida:**
```text
A  .gitignore
A  Dockerfile
A  Dockerfile.jenkins
A  Jenkinsfile
A  README.md
A  COMANDOS_GIT.md
A  docker-compose.yml
A  package.json
A  sonar-project.properties
A  src/app.js
A  src/server.js
A  tests/server.test.js
A  public/index.html
A  public/style.css
A  public/app.js
A  docs/images/01_jenkins_pipeline_marcio.jpg
A  docs/images/02_sonarqube_quality_gate.jpg
A  docs/images/03_webapp_dev_3000.jpg
A  docs/images/04_webapp_prd_3001.jpg
```

---

### Etapa 2.4: Realização do Commit Semântico

Consolidação do versionamento com mensagem padronizada no padrão *Conventional Commits*:

```bash
# 11. Criar o commit contendo a esteira de CI/CD completa
git commit -m "feat(ci-cd): implementacao completa da pipeline Jenkins, SonarQube, testes Jest e deploy multi-ambiente"
```

**Saída obtida:**
```text
[main e8a12bc] feat(ci-cd): implementacao completa da pipeline Jenkins, SonarQube, testes Jest e deploy multi-ambiente
 18 files changed, 1420 insertions(+)
 create mode 100644 Dockerfile
 create mode 100644 Dockerfile.jenkins
 create mode 100644 Jenkinsfile
 create mode 100644 README.md
 create mode 100644 COMANDOS_GIT.md
 create mode 100644 docker-compose.yml
 create mode 100644 package.json
 create mode 100644 sonar-project.properties
 ...
```

---

### Etapa 2.5: Envio das Alterações para o Repositório Remoto (Push)

Sincronização dos commits locais com a branch principal no GitHub:

```bash
# 12. Garantir que a branch padrão seja 'main'
git branch -M main

# 13. Enviar as alterações locais para o repositório remoto GitHub
git push -u origin main
```

---

### Etapa 2.6: Criação de Tag de Release para Produção

Criação de tag anotada marcando a versão estável aprovada para produção:

```bash
# 14. Criar tag anotada com descrição da aprovação pelo Engenheiro DevOps
git tag -a v1.0.0-prod -m "Release v1.0.0 aprovada para producao pelo Engenheiro DevOps Marcio Pereira via Jenkins Approval Gate"

# 15. Enviar a tag para o GitHub
git push origin v1.0.0-prod

# 16. Listar as tags existentes
git tag -n
```

**Saída obtida:**
```text
v1.0.0-prod     Release v1.0.0 aprovada para producao pelo Engenheiro DevOps Marcio Pereira via Jenkins Approval Gate
```

---

### Etapa 2.7: Verificação do Histórico e Log de Commits

Visualização do grafo de commits e rastreabilidade:

```bash
# 17. Exibir histórico de commits de forma concisa e gráfica
git log --oneline --graph --decorate -n 5
```

---

## 📋 3. Tabela Resumo dos Comandos e Finalidades

| Comando | Finalidade |
| :--- | :--- |
| `git clone <url>` | Clona o repositório remoto para a estação de trabalho |
| `git config user.name "<nome>"` | Define o nome do autor dos commits |
| `git config user.email "<email>"` | Define o email corporativo do autor |
| `git status` | Exibe o estado da árvore de trabalho e staging area |
| `git add .` | Adiciona arquivos novos e modificados para staging |
| `git commit -m "<msg>"` | Registra as alterações no histórico do Git |
| `git branch -M main` | Renomeia/define a branch principal como `main` |
| `git push -u origin main` | Envia commits e configura rastreamento na branch remota |
| `git tag -a <tag> -m "<msg>"` | Cria uma tag anotada de release para produção |
| `git push origin <tag>` | Publica a tag de versão no repositório remoto |
| `git log --oneline` | Exibe o histórico de commits resumido |

---

<div align="center">
  <sub>Documento gerado para a Unidade 2 • Pós-Graduação em Engenharia DevOps • Faculdade Unyleya</sub>
</div>
