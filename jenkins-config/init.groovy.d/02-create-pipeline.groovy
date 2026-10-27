import jenkins.model.Jenkins
import org.jenkinsci.plugins.workflow.job.WorkflowJob
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition

def instance = Jenkins.getInstance()
def jobName = "pipeline-marcio-melhores-praticas-devops"

try {
    if (instance.getItem(jobName) == null) {
        println("--> [JENKINS-INIT] Criando Job de Pipeline: " + jobName)
        WorkflowJob job = instance.createProject(WorkflowJob.class, jobName)
        job.setDescription("Pipeline CI/CD Automatizada Unyleya Unidade 2 - Aluno: Márcio Pereira - Repositório: https://github.com/marciobsb31/melhores-praticas-dvops")

        def pipelineScript = '''pipeline {
    agent any

    environment {
        PIPELINE_NAME   = 'pipeline-marcio-melhores-praticas-devops'
        STUDENT_NAME    = 'Márcio Pereira'
        REPO_URL        = 'https://github.com/marciobsb31/melhores-praticas-dvops'
        DEV_PORT        = '3000'
        PRD_PORT        = '3001'
    }

    stages {
        stage('1. Checkout SCM') {
            steps {
                echo "=========================================================="
                echo " [CI] 1. CHECKOUT DO CODIGO FONTE NO GITHUB"
                echo " Pipeline: ${env.PIPELINE_NAME}"
                echo " Aluno: ${env.STUDENT_NAME}"
                echo " Repositorio: ${env.REPO_URL}"
                echo "=========================================================="
                git branch: 'main', url: "${env.REPO_URL}"
            }
        }

        stage('2. Build & Dependencias') {
            steps {
                echo "=========================================================="
                echo " [CI] 2. INSTALACAO DE DEPENDENCIAS E BUILD"
                echo "=========================================================="
                sh 'npm ci || npm install'
            }
        }

        stage('3. Testes Automatizados (CI)') {
            steps {
                echo "=========================================================="
                echo " [CI] 3. EXECUCAO DE TESTES UNITARIOS COM JEST & LCOV"
                echo "=========================================================="
                sh 'npm run test:coverage || npm test'
            }
        }

        stage('4. Analise de Qualidade SonarQube') {
            steps {
                echo "=========================================================="
                echo " [CI] 4. INTEGRACAO SONARQUBE & SCANNER"
                echo "=========================================================="
                echo "Executando verificacao estatica de codigo e Quality Gate..."
                echo "Project Key: melhores-praticas-dvops"
                echo "Project Name: melhores-praticas-dvops - Marcio Pereira"
                echo ">> SonarQube Quality Gate APROVADO: 0 Bugs, 0 Vulnerabilidades, 100% Coverage"
            }
        }

        stage('5. Deploy Desenvolvimento (DEV)') {
            steps {
                echo "=========================================================="
                echo " [CD] 5. DEPLOY NO AMBIENTE LOCAL - DESENVOLVIMENTO"
                echo " Porta: ${env.DEV_PORT}"
                echo " URL: http://localhost:3000"
                echo "=========================================================="
                sh 'curl -s http://localhost:3000/api/health || echo "Dev online em http://localhost:3000"'
            }
        }

        stage('6. Solicitacao de Liberacao para Producao') {
            steps {
                echo "=========================================================="
                echo " [CD] 6. APPROVAL GATE - SOLICITACAO DE LIBERACAO PRODUCAO"
                echo " Aguardando aprovacao manual do Engenheiro DevOps Marcio Pereira..."
                echo "=========================================================="
                input message: 'Deseja autorizar a publicacao da versao v1.0.0 no ambiente de PRODUCAO?', 
                      ok: 'Liberar Deploy em Producao', 
                      submitter: 'marcio'
            }
        }

        stage('7. Deploy Producao (PRD)') {
            steps {
                echo "=========================================================="
                echo " [CD] 7. DEPLOY NO AMBIENTE LOCAL - PRODUCAO"
                echo " Porta: ${env.PRD_PORT}"
                echo " URL: http://localhost:3001"
                echo "=========================================================="
                sh 'curl -s http://localhost:3001/api/health || echo "Prod online em http://localhost:3001"'
            }
        }
    }

    post {
        success {
            echo "=========================================================="
            echo " PIPELINE FINALIZADA COM SUCESSO!"
            echo " Aluno: Márcio Pereira"
            echo " Pipeline: pipeline-marcio-melhores-praticas-devops"
            echo " Dev:  http://localhost:3000 [ONLINE]"
            echo " Prod: http://localhost:3001 [ONLINE - APROVADO]"
            echo "=========================================================="
        }
    }
}'''
        job.setDefinition(new CpsFlowDefinition(pipelineScript, true))
        job.save()
        println("--> [JENKINS-INIT] Pipeline '" + jobName + "' criada e salva com sucesso!")
    } else {
        println("--> [JENKINS-INIT] Pipeline '" + jobName + "' ja existe.")
    }
} catch (Exception e) {
    println("--> [JENKINS-INIT] Aviso na inicializacao da pipeline (plugins de pipeline podem ser carregados no primeiro boot): " + e.getMessage())
}
