// ==============================================================================
// PIPELINE CI/CD - UNYLEYA | ENGENHEIRO DEVOPS | UNIDADE 2
// Pipeline Name: pipeline-marcio-melhores-praticas-devops
// Aluno: Márcio Pereira
// Repositório Remoto: https://github.com/marciobsb31/melhores-praticas-dvops
// ==============================================================================

pipeline {
    agent any

    environment {
        PIPELINE_NAME   = 'pipeline-marcio-melhores-praticas-devops'
        STUDENT_NAME    = 'Márcio Pereira'
        REPO_URL        = 'https://github.com/marciobsb31/melhores-praticas-dvops'
        SONAR_HOST_URL  = 'http://sonarqube:9000'
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

        stage('2. Build & Dependências') {
            steps {
                echo "=========================================================="
                echo " [CI] 2. INSTALACAO DE DEPENDENCIAS E BUILD"
                echo "=========================================================="
                sh 'npm ci'
            }
        }

        stage('3. Testes Automatizados (CI)') {
            steps {
                echo "=========================================================="
                echo " [CI] 3. EXECUCAO DE TESTES UNITARIOS COM JEST & LCOV"
                echo "=========================================================="
                sh 'npm run test:coverage'
            }
        }

        stage('4. Analise de Qualidade SonarQube') {
            steps {
                echo "=========================================================="
                echo " [CI] 4. INTEGRACAO SONARQUBE & SCANNER"
                echo "=========================================================="
                withSonarQubeEnv('SonarQubeServer') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=melhores-praticas-dvops \
                          -Dsonar.projectName="melhores-praticas-dvops - Marcio Pereira" \
                          -Dsonar.sources=src \
                          -Dsonar.tests=tests \
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                          -Dsonar.qualitygate.wait=true
                    '''
                }
                timeout(time: 5, unit: 'MINUTES') {
                    script {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline abortada: SonarQube Quality Gate Falhou! Status: ${qg.status}"
                        }
                        echo ">> SonarQube Quality Gate APROVADO com sucesso!"
                    }
                }
            }
        }

        stage('5. Deploy Desenvolvimento (DEV)') {
            steps {
                echo "=========================================================="
                echo " [CD] 5. DEPLOY NO AMBIENTE LOCAL - DESENVOLVIMENTO"
                echo " Porta: ${env.DEV_PORT}"
                echo " URL: http://localhost:3000"
                echo "=========================================================="
                sh '''
                    echo "Iniciando Web App Desenvolvimento..."
                    docker compose up -d webapp-dev
                '''
            }
        }

        stage('6. Validacao E2E Dev') {
            steps {
                echo "=========================================================="
                echo " [CD] 6. HEALTH CHECK NO AMBIENTE DE DEV"
                echo "=========================================================="
                sh 'curl -f http://localhost:3000/api/health || exit 1'
            }
        }

        stage('7. Solicitacao de Liberacao para Producao') {
            steps {
                echo "=========================================================="
                echo " [CD] 7. APPROVAL GATE - SOLICITACAO DE LIBERACAO PRODUCAO"
                echo " Aguardando aprovacao manual do Engenheiro DevOps Marcio Pereira..."
                echo "=========================================================="
                input message: 'Deseja autorizar a publicacao da versao v1.0.0 no ambiente de PRODUCAO?', 
                      ok: 'Liberar Deploy em Producao', 
                      submitter: 'marcio'
            }
        }

        stage('8. Deploy Producao (PRD)') {
            steps {
                echo "=========================================================="
                echo " [CD] 8. DEPLOY NO AMBIENTE LOCAL - PRODUCAO"
                echo " Porta: ${env.PRD_PORT}"
                echo " URL: http://localhost:3001"
                echo "=========================================================="
                sh '''
                    echo "Iniciando Web App Producao..."
                    docker compose up -d webapp-prd
                '''
            }
        }

        stage('9. Validacao E2E Producao') {
            steps {
                echo "=========================================================="
                echo " [CD] 9. HEALTH CHECK NO AMBIENTE DE PRODUCAO"
                echo "=========================================================="
                sh 'curl -f http://localhost:3001/api/health || exit 1'
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
        failure {
            echo ">> Falha detectada durante a execucao da Pipeline CI/CD."
        }
    }
}
