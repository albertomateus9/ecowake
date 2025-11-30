# 🚀 EcoWake - Guia de Integração PowerBI + Dashboard
## Para: Prof. MSc Alberto Mateus

---

## 📊 SITUAÇÃO ATUAL

### ✅ O que foi concluído:

1. **PowerBI Publicado** (Rafaella Guimarães)
   - Link: https://app.powerbi.com/view?r=eyJrIjoiY2VhMDZkM2YtY2RjMS00MDE5LWJmYWMtMGU5Zjc1MDlmOTY4IiwidCI6ImFkYWMzNzYyLWYzMWQtNDliNS1iYWI1LWY3NjcxNzZmZjQyNSJ9
   - Status: ✅ Publicado e acessível
   - Embed Code: Pronto para integração

2. **Dashboard HTML Otimizado**
   - 3 versões criadas:
     * powerbi-premium.html (Enterprise version)
     * dashboard-optimizado.html (Clean version)
     * hub-powerbi-dashboard.html (Central Hub - RECOMENDADO)
   - Status: ✅ Pronto para upload

3. **Dados da Frota**
   - 21 navios Transpetro
   - Informações completas (porte, classe, docagens)
   - Integrado nos dashboards

---

## 🔧 PRÓXIMOS PASSOS

### ETAPA 1: Upload no GitHub (10 minutos)

```bash
# 1. Abra Notepad++
# 2. File → Open → Selecione: hub-powerbi-dashboard.html
# 3. File → Save As
#    - Nome: hub-powerbi-dashboard.html
#    - Tipo: All files (*.*)
#    - Encoding: UTF-8 without BOM
#    - Pasta: frontend/dist/

# 4. Acesse GitHub:
#    https://github.com/albertomateus9/ecowake
# 5. Add file → Upload files
# 6. Selecione o arquivo salvo
# 7. Coloque em: frontend/dist/
# 8. Commit message:
#    "feat: Add PowerBI hub with integrated dashboard and Rafaella's PowerBI embed"

# 9. Commit changes
```

### ETAPA 2: Deploy na VPS (5 minutos)

```bash
# Na VPS:
cd ~/projects/ecowake
git pull origin main
docker-compose restart nginx

# Verificar:
docker-compose ps  # Todos deve estar 'Up'
```

### ETAPA 3: Acessar a Solução

**Agora você terá 4 URLs funcionais:**

1. **Hub Central (RECOMENDADO)**
   - URL: https://ecowake.online/hub-powerbi-dashboard.html
   - Contém: PowerBI embed + Dashboard HTML + Downloads
   - O que tem:
     * Aba 1: PowerBI Publicado (Rafaella) - EMBED DIRETO
     * Aba 2: Dashboard HTML com gráficos
     * Aba 3: Seção de downloads

2. **PowerBI Publicado (Original da Rafaella)**
   - URL: https://app.powerbi.com/view?r=eyJrIjoiY2VhMDZkM2YtY2RjMS00MDE5LWJmYWMtMGU5Zjc1MDlmOTY4IiwidCI6ImFkYWMzNzYyLWYzMWQtNDliNS1iYWI1LWY3NjcxNzZmZjQyNSJ9
   - Acesso: Direto no navegador ou via Hub

3. **Dashboard Premium**
   - URL: https://ecowake.online/powerbi-premium.html
   - Gráficos interativos completos

4. **Dashboard Otimizado**
   - URL: https://ecowake.online/dashboard-optimizado.html
   - Versão clean e performática

---

## 📥 ARQUIVO .PBIX (Power BI Desktop)

### Sobre o arquivo .pbix:

O arquivo .pbix é o **arquivo nativo do Power BI** que:
- Contém modelos de dados, transformações e visualizações
- Pode ser aberto no **Power BI Desktop** (gratuito)
- Pode ser carregado no **Power BI Service** (nuvem)
- Permite edição completa dos gráficos e relatórios

### Como obter:

**Opção 1: Baixar do Power BI Service (Rafaella)**
1. Acesse: https://app.powerbi.com
2. Faça login com a conta
3. Procure o relatório "transpetro"
4. Clique em ... (menu) → Download
5. Selecione "Download this report"
6. Arquivo será salvo como .pbix

**Opção 2: Via Power BI Desktop**
1. Instale: https://powerbi.microsoft.com/desktop/
2. Sign in com a conta Microsoft
3. Abra o relatório do Service
4. File → Save (salva como .pbix localmente)

### Como usar o .pbix:

```bash
# Com Power BI Desktop instalado:
1. File → Open
2. Selecione o arquivo .pbix
3. Edite modelos, gráficos, dados
4. Publish para Power BI Service (para compartilhar)
```

---

## 💡 RECOMENDAÇÕES PARA HACKATHON

### ✅ MELHOR ESTRATÉGIA:

**Usar o Hub Central** (hub-powerbi-dashboard.html):
- Única URL para todas as soluções
- PowerBI embed com link para versão completa
- Dashboard HTML como fallback/complemento
- Seção de downloads para especialistas
- Design profissional e responsivo

**Fluxo de Apresentação:**

1. **Live Demo:**
   - Abra https://ecowake.online/hub-powerbi-dashboard.html
   - Mostre a Aba PowerBI (relatório completo da Rafaella)
   - Clique em "Abrir em Nova Aba" para versão full
   - Mude para Aba Dashboard HTML (gráficos interativos)
   - Mostre a Aba Downloads

2. **Tecnologia:**
   - "O PowerBI foi desenvolvido por Rafaella com análises profissionais"
   - "O Dashboard HTML oferece alternativa web com performance otimizada"
   - "Ambos conectados aos mesmos dados da frota Transpetro"

3. **Diferenciais:**
   - ✅ Dados reais (21 navios)
   - ✅ Gráficos interativos (Doughnut, Bar, Line)
   - ✅ PowerBI profissional + Web alternative
   - ✅ Responsivo (mobile/tablet)
   - ✅ Performance otimizada
   - ✅ Deploy em produção (VPS + Docker)

---

## 📋 ARQUIVOS CRIADOS

### HTML Files:
1. `powerbi-premium.html` - Dashboard Premium com design enterprise
2. `dashboard-optimizado.html` - Dashboard limpo e rápido
3. `hub-powerbi-dashboard.html` - HUB CENTRAL (RECOMENDADO) ⭐

### Já Existentes:
1. `index.html` - Dashboard original
2. `DEPLOYMENT.md` - Guia de deploy

### Dados:
- 21 navios Transpetro integrados
- Dados de docagens históricos
- Eficiências por classe
- Informações de revestimento

---

## 🔗 LINKS IMPORTANTES

| O que | Link | Responsável |
|------|------|-------------|
| PowerBI Publicado | https://app.powerbi.com/view?r=... | Rafaella ✓ |
| Hub Dashboard | https://ecowake.online/hub-powerbi-dashboard.html | Seu deploy |
| GitHub Repo | https://github.com/albertomateus9/ecowake | Versionamento |
| VPS | 31.97.160.249 | Hostinger |
| Domínio | ecowake.online | Configurado |

---

## ❓ DÚVIDAS COMUNS

### P: Por que 3 dashboards diferentes?
**R:** 
- PowerBI: Análise profissional com dados interativos (Rafaella)
- Premium HTML: Design enterprise com muitos gráficos
- Otimizado: Versão light, rápido carregamento
- Hub: Centraliza tudo em uma página

**Recomendação:** Use o HUB para apresentar

### P: O PowerBI funciona sem internet?
**R:** Não. O PowerBI precisa estar conectado à internet para funcionar.
**Solução:** Use o Dashboard HTML como alternativa offline

### P: Posso editar os dados?
**R:** 
- PowerBI: Sim, pela interface do Power BI Desktop (.pbix)
- Dashboard HTML: Sim, editando o array `ships` no JavaScript

### P: Como adicionar novos navios?
**R:** 
Edite o array `ships` no código JavaScript:
```javascript
{ name: "NOVO NAVIO", class: "Suezmax", porte: 150000, length: 274, lastDocking: "1/1/25" }
```

### P: Funciona em mobile?
**R:** ✅ Sim! Totalmente responsivo
- Navegação colapsável em telas pequenas
- Gráficos adaptáveis
- Tabelas com scroll horizontal

---

## 🎯 CHECKLIST FINAL

Antes da apresentação:

- [ ] GitHub atualizado com hub-powerbi-dashboard.html
- [ ] VPS com novo deploy
- [ ] Testar https://ecowake.online/hub-powerbi-dashboard.html
- [ ] Verificar PowerBI embed funciona
- [ ] Testar Dashboard HTML (Aba 2)
- [ ] Testar Downloads (Aba 3)
- [ ] Carregar em mobile/tablet
- [ ] Ter link do PowerBI original como backup
- [ ] Preparar explicação da solução

---

## 📞 CONTATO TÉCNICO

- **GitHub:** albertomateus9
- **Técnico:** Prof. MSc Alberto Mateus
- **PowerBI:** Rafaella Guimarães ✓
- **Suporte Infra:** Hostinger (31.97.160.249)

---

**Status Geral:** ✅ PRONTO PARA HACKATHON

Última atualização: 30 de Novembro de 2025
Desenvolvido para: Transpetro Hackathon 2025 - Bioincrustação Predictive Solutions
