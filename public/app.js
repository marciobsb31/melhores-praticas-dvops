// DevOps Portal Client-side Logic - Unyleya Unidade 2
document.addEventListener('DOMContentLoaded', () => {
  // Navigation Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // Fetch Environment & Health Info
  fetchAppInfo();
  fetchHealth();

  // Refresh Health Button
  const btnRefresh = document.getElementById('btn-refresh-health');
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      btnRefresh.textContent = 'Verificando...';
      fetchHealth().finally(() => {
        setTimeout(() => {
          btnRefresh.textContent = 'Testar Agora';
        }, 600);
      });
    });
  }

  // Copy Jenkinsfile Button
  const btnCopy = document.getElementById('btn-copy-jenkinsfile');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const code = document.getElementById('jenkinsfile-code-display').innerText;
      navigator.clipboard.writeText(code).then(() => {
        btnCopy.textContent = '✓ Copiado!';
        setTimeout(() => {
          btnCopy.textContent = 'Copiar Jenkinsfile';
        }, 2000);
      });
    });
  }

  // Interactive Calculator API Call
  const btnCalc = document.getElementById('btn-calc-submit');
  if (btnCalc) {
    btnCalc.addEventListener('click', async () => {
      const a = parseFloat(document.getElementById('num-a').value);
      const b = parseFloat(document.getElementById('num-b').value);
      const op = document.getElementById('op-select').value;
      const resVal = document.getElementById('calc-result-val');

      resVal.textContent = 'Calculando via /api/math/calc...';

      try {
        const response = await fetch('/api/math/calc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ a, b, op })
        });
        const data = await response.json();
        if (response.ok) {
          resVal.innerHTML = `<span style="color: #34d399;">✓ ${a} ${getOpSymbol(op)} ${b} = ${data.result}</span>`;
        } else {
          resVal.innerHTML = `<span style="color: #f43f5e;">Erro: ${data.error}</span>`;
        }
      } catch (err) {
        resVal.innerHTML = `<span style="color: #f43f5e;">Falha na requisição: ${err.message}</span>`;
      }
    });
  }
});

function getOpSymbol(op) {
  switch (op) {
    case 'add': return '+';
    case 'sub': return '-';
    case 'mul': return '×';
    case 'div': return '÷';
    default: return '?';
  }
}

async function fetchAppInfo() {
  try {
    const res = await fetch('/api/info');
    if (!res.ok) return;
    const info = await res.json();

    const isProd = info.environment === 'PRODUCTION' || window.location.port === '3001';

    const envBadge = document.getElementById('env-badge-container');
    const envNameText = document.getElementById('env-name-text');
    const envPortTag = document.getElementById('env-port-tag');
    const chipVersion = document.getElementById('chip-version');
    const metricPort = document.getElementById('metric-port');
    const metricRelease = document.getElementById('metric-release-type');
    const metricApproval = document.getElementById('metric-approval');
    const deployStatusLabel = document.getElementById('deploy-status-label');
    const envDesc = document.getElementById('env-description-text');
    const cardEnv = document.getElementById('card-env-details');

    if (isProd) {
      envBadge.className = 'env-badge prod-badge';
      envNameText.textContent = 'AMBIENTE LOCAL - PRODUÇÃO (PRD)';
      envPortTag.textContent = ':3001';
      chipVersion.textContent = 'v1.0.0-PROD';
      metricPort.textContent = '3001';
      metricRelease.textContent = 'Produção (Aprovado)';
      metricApproval.textContent = 'Aprovado por Márcio';
      metricApproval.style.color = '#fbbf24';
      deployStatusLabel.textContent = 'PRODUÇÃO ATIVA';
      deployStatusLabel.className = 'badge-passed';
      deployStatusLabel.style.background = 'rgba(245, 158, 11, 0.15)';
      deployStatusLabel.style.borderColor = 'rgba(245, 158, 11, 0.4)';
      deployStatusLabel.style.color = '#fbbf24';
      envDesc.textContent = 'Ambiente de PRODUÇÃO estável. A publicação foi efetuada após a aprovação manual do Engenheiro DevOps Márcio Pereira no portão de aprovação (Approval Gate) do Jenkins.';
      if (cardEnv) {
        cardEnv.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        cardEnv.style.boxShadow = '0 0 25px rgba(245, 158, 11, 0.15)';
      }
    } else {
      envBadge.className = 'env-badge dev-badge';
      envNameText.textContent = 'AMBIENTE LOCAL - DESENVOLVIMENTO (DEV)';
      envPortTag.textContent = ':3000';
      chipVersion.textContent = 'v1.0.0-DEV';
      metricPort.textContent = '3000';
      metricRelease.textContent = 'Automático CI/CD';
      metricApproval.textContent = 'Pendente de Input';
      deployStatusLabel.textContent = 'AUTOMÁTICO DEV';
    }
  } catch (e) {
    console.warn('Não foi possível obter /api/info:', e);
  }
}

async function fetchHealth() {
  const terminal = document.getElementById('health-json-output');
  try {
    const res = await fetch('/api/health');
    const json = await res.json();
    if (terminal) {
      terminal.textContent = JSON.stringify(json, null, 2);
    }
  } catch (err) {
    if (terminal) {
      terminal.textContent = `// Erro ao consultar /api/health:\n${err.message}`;
    }
  }
}
