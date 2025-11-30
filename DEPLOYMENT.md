# 🚀 Guia de Deploy - EcoWake

## 📍 Ambiente de Produção

| Componente | Valor |
|-----------|-------|
| **VPS** | Hostinger |
| **IP** | 31.97.160.249 |
| **Domínio** | ecowake.online |
| **User SSH** | ecowake |
| **Repositório** | https://github.com/albertomateus9/ecowake |

---

## 🛠️ Stack Tecnológico

- **Frontend**: HTML5 + CSS3 + JavaScript (Chart.js)
- **Backend**: FastAPI (Python 3.11)
- **Banco de Dados**: PostgreSQL 15
- **Web Server**: Nginx (Reverse Proxy)
- **SSL**: Let's Encrypt (Auto-renovação)
- **Orquestração**: Docker Compose
- **Versionamento**: Git + GitHub

---

## 📋 Pré-requisitos

### Na sua máquina (Local)
- [ ] Git instalado
- [ ] Notepad++ ou editor de texto
- [ ] Acesso SSH à VPS
- [ ] Acesso ao GitHub (token ou SSH key)

### Na VPS
- [ ] Docker & Docker Compose instalados
- [ ] SSH configurado
- [ ] Domínio apontando para IP correto
- [ ] Portas 80 e 443 abertas

---

## 🔄 Workflow de Deploy

### **ETAPA 1: Preparar Arquivos Localmente (Notepad++)**

1. **Abra Notepad++**
2. **File → New**
3. **Configure encoding**: Settings → Preferences → New Document → `UTF-8 without BOM`
4. **Edite os arquivos:**
   - `index.html` (Dashboard)
   - `backend/main.py` (API)
   - `DEPLOYMENT.md` (Este arquivo)
   - Qualquer outro arquivo necessário

5. **Salve cada arquivo:**
   - **File → Save As...**
   - Selecione `All files (*.*)`
   - Encoding: **UTF-8 without BOM**
   - Extensão correta (`.html`, `.py`, `.md`, etc.)

---

### **ETAPA 2: Sincronizar com GitHub**

#### Opção A: Via Interface Web (Mais Simples)

1. Acesse: **https://github.com/albertomateus9/ecowake**
2. Clique em **Add file → Upload files**
3. **Selecione os arquivos** (Ctrl+Click para múltiplos)
4. **Coloque na pasta correta:**
   - `frontend/dist/index.html`
   - `backend/main.py`
   - `DEPLOYMENT.md` (raiz)
5. **Commit message**: 
   ```
   docs: Update deployment guide and dashboard
   feat: Add BI dashboard with real-time charts
   ```
6. **Commit changes**

#### Opção B: Via Git CLI (Mais Controle)

```bash
# Navegue até a pasta do projeto
cd C:\caminho\para\ecowake

# Ver status
git status

# Adicionar todos os arquivos
git add .

# Verificar o que vai ser commitado
git diff --cached

# Commit com mensagem descritiva
git commit -m "docs: Update deployment guide and frontend dashboard"

# Push para main
git push origin main

# Se pedir senha, use seu token do GitHub
```

---

### **ETAPA 3: Deploy na VPS**

#### Via SSH (Terminal/PuTTY)

```bash
# 1. Conectar à VPS
ssh ecowake@31.97.160.249

# 2. Entrar no diretório do projeto
cd ~/projects/ecowake

# 3. Fazer pull dos novos arquivos
git pull origin main

# Se houver conflitos, resolver com:
# git checkout --theirs .
# git add .
# git commit -m "Resolve merge conflicts"

# 4. Verificar arquivos foram baixados
ls -la frontend/dist/
cat DEPLOYMENT.md

# 5. Reconstruir containers se necessário
docker-compose build

# 6. Reiniciar serviços
docker-compose restart nginx backend

# 7. Esperar 5 segundos para estabilizar
sleep 5

# 8. Verificar status
docker-compose ps

# 9. Testar health check
curl -s https://ecowake.online/api/health | jq .
```

---

## ✅ Checklist de Deploy

### Preparação Local
- [ ] Todos os arquivos editados no Notepad++
- [ ] Encoding UTF-8 without BOM confirmado
- [ ] Extensões de arquivo corretas
- [ ] Sem caracteres especiais em nomes de arquivo

### GitHub
- [ ] Arquivos enviados via Upload ou Git
- [ ] Commit message descritiva
- [ ] Branch main selecionado
- [ ] GitHub mostra os novos commits

### VPS
- [ ] SSH conectado com sucesso
- [ ] `git pull origin main` executado sem erros
- [ ] `docker-compose restart` funcionou
- [ ] Containers rodando (`docker-compose ps`)
- [ ] Health check retorna 200 OK

### Validação
- [ ] https://ecowake.online carrega sem erro (dashboard)
- [ ] https://ecowake.online/api/health retorna JSON
- [ ] Gráficos no dashboard carregam
- [ ] Responsivo em mobile

---

## 🧪 Testes Pós-Deploy

### 1. Verificar Frontend
```bash
curl -s https://ecowake.online | grep "EcoWake Dashboard"
```

### 2. Verificar API
```bash
curl -s https://ecowake.online/api/health | jq .
curl -s https://ecowake.online/api/ships | jq .
curl -s https://ecowake.online/api/predictions | jq .
```

### 3. Verificar SSL
```bash
# Deve mostrar "Certificado válido"
openssl s_client -connect ecowake.online:443 -brief
```

### 4. Verificar Logs
```bash
# Logs do backend
docker-compose logs backend --tail=20

# Logs do nginx
docker-compose logs nginx --tail=20

# Logs do postgres
docker-compose logs postgres --tail=20
```

---

## 🔄 Rollback (Desfazer Deploy)

Se algo der errado:

```bash
# Na VPS
cd ~/projects/ecowake

# Ver histórico de commits
git log --oneline | head -10

# Voltar para commit anterior
git reset --hard HEAD~1

# Ou checkout de um commit específico
git checkout 7afc9cc

# Reconstruir e reiniciar
docker-compose up -d --build
```

---

## 🛡️ Troubleshooting

### Erro: "git: command not found"
```bash
# Instalar git na VPS
sudo apt-get update
sudo apt-get install -y git
```

### Erro: "Permission denied (publickey)"
```bash
# Gerar SSH key
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub  # Copiar e adicionar em GitHub Settings
```

### Erro: "docker: command not found"
```bash
# Docker já deve estar instalado
# Se não estiver, instalar
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Erro: "Port 443 already in use"
```bash
# Verificar qual processo está usando porta 443
sudo lsof -i :443
sudo kill -9 <PID>
docker-compose restart nginx
```

### Dashboard não carrega dados
```bash
# Verificar se API está respondendo
curl -s https://ecowake.online/api/predictions

# Se retornar 404, o backend pode não ter as rotas corretas
# Verificar backend/main.py no GitHub
```

---

## 📞 Contatos Importantes

| Pessoa | Role | Contato |
|--------|------|---------|
| Prof. Alberto Mateus | Orientador | professormsc@example.com |
| Suporte Hostinger | Infraestrutura | support@hostinger.com |
| GitHub | Versionamento | support@github.com |

---

## 📝 Histórico de Deploys

| Data | Versão | Mudanças | Status |
|------|--------|----------|--------|
| 30/11/2025 | v1.0 | Infraestrutura inicial | ✅ Live |
| 30/11/2025 | v1.1 | Dashboard BI | ⏳ Pending |
| XX/XX/XXXX | v1.2 | Modelo ML | 📋 Planned |

---

## 🚀 Próximos Passos

1. **Integrar modelo ML** de predição de bioincrustação
2. **Implementar autenticação JWT** para APIs protegidas
3. **Criar sistema de alertas** por email/SMS
4. **Adicionar histórico** de predições
5. **Gerar relatórios** em PDF/Excel

---

**Último Update**: 30 de Novembro de 2025
**Mantido por**: Prof. MSc Alberto Mateus
**Equipe**: EcoWake Hackathon Transpetro 2025
