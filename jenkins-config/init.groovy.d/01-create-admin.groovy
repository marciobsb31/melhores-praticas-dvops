import jenkins.model.*
import hudson.security.*

def instance = Jenkins.getInstance()

println("--> [JENKINS-INIT] Configurando Realm de Seguranca e Usuario Administrador Marcio Pereira...")

def hudsonRealm = new HudsonPrivateSecurityRealm(false)
def user = hudsonRealm.createAccount("marcio", "admin123")
user.setFullName("Márcio Pereira")
user.save()

// Criar tambem usuario admin de contingencia
def adminUser = hudsonRealm.createAccount("admin", "admin123")
adminUser.setFullName("Administrador")
adminUser.save()

instance.setSecurityRealm(hudsonRealm)

def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
strategy.setAllowAnonymousRead(true)
instance.setAuthorizationStrategy(strategy)

instance.save()
println("--> [JENKINS-INIT] Usuario 'marcio' (senha: admin123) criado com sucesso com acesso administrativo!")
