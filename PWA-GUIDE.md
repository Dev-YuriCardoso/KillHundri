# 📱 KillHungry's - PWA Instalável

## ✨ O que é um PWA?

**Progressive Web App (PWA)** é uma aplicação web que pode ser instalada diretamente no smartphone ou desktop, funcionando como um app nativo, mas sem precisar de App Store ou Google Play.

### 🎯 Vantagens do nosso PWA:

- ✅ **Instalável**: Adicione à tela inicial com um clique
- ✅ **Funciona Offline**: Veja o menu mesmo sem internet
- ✅ **Notificações Push**: Receba atualizações sobre pedidos (futuro)
- ✅ **Carregamento Rápido**: Cache inteligente de imagens e dados
- ✅ **Experiência Nativa**: Interface otimizada para mobile
- ✅ **Sem lojas de apps**: Acesso direto pelo navegador
- ✅ **Atualizações Automáticas**: Sempre a versão mais recente

---

## 📲 Como Instalar no Celular

### **Android (Chrome)**

1. Abra o site no navegador **Chrome**
2. Toque nos **três pontos** (⋮) no canto superior direito
3. Selecione **"Adicionar à tela inicial"** ou **"Instalar app"**
4. Confirme tocando em **"Adicionar"** ou **"Instalar"**

💡 **Dica**: Um banner automático pode aparecer sugerindo a instalação!

---

### **iPhone (Safari)**

1. Abra o site no navegador **Safari** (outros navegadores não funcionam no iOS)
2. Toque no botão **Compartilhar** (ícone de quadrado com seta para cima)
3. Role para baixo e toque em **"Adicionar à Tela de Início"**
4. Confirme tocando em **"Adicionar"**

⚠️ **Importante**: No iOS, apenas o Safari suporta instalação de PWA.

---

### **Desktop (Chrome, Edge, Brave)**

1. Abra o site no navegador
2. Clique no ícone de **instalação** na barra de endereço (ícone de computador/telefone)
3. Ou acesse o menu (⋮) → **"Instalar KillHungry's..."**
4. Confirme a instalação

---

## 🛠️ Tecnologias Utilizadas

### **PWA Stack:**
- **Vite PWA Plugin**: Configuração automática de Service Worker e Manifest
- **Workbox**: Estratégias avançadas de cache
  - Cache-First para imagens (carrega offline)
  - Network-First para APIs (sempre busca atualizado)
- **Web App Manifest**: Configuração de ícones, nome, cores e comportamento

### **Configurações Implementadas:**

```typescript
// vite.config.ts
VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'KillHungry\'s - Food Delivery',
    short_name: 'KillHungry\'s',
    theme_color: '#ff6b35',
    background_color: '#ffffff',
    display: 'standalone',
    icons: [
      { src: '/icon-192x192.png', sizes: '192x192' },
      { src: '/icon-512x512.png', sizes: '512x512' }
    ]
  }
})
```

---

## 🎨 Design do PWA

### **Ícones Gerados:**
- `icon-192x192.png`: Ícone pequeno (tela inicial Android)
- `icon-512x512.png`: Ícone grande (splash screen e lojas)

**Design**: Fundo laranja (#ff6b35) com garfo e faca brancos cruzados, simbolizando comida e entrega.

### **Cores do Tema:**
- **Primary**: `#ff6b35` (laranja vibrante)
- **Background**: `#ffffff` (branco)
- **Display Mode**: `standalone` (tela cheia sem barra de navegador)

---

## 🧪 Como Testar Localmente

### **1. Instalar dependências:**
```bash
npm install
```

### **2. Build de produção (PWA só funciona em produção):**
```bash
npm run build
```

### **3. Preview da build:**
```bash
npm run preview
```

### **4. Testar em dispositivo móvel:**

**Opção A - Ngrok (recomendado):**
```bash
# Instalar ngrok: https://ngrok.com/
npm run preview
ngrok http 4173
# Acesse a URL do ngrok no celular
```

**Opção B - IP Local:**
```bash
# Descubra seu IP local
ipconfig    # Windows
ifconfig    # Mac/Linux

# Configure o Vite para aceitar conexões externas
npm run preview -- --host
# Acesse http://SEU_IP:4173 no celular
```

### **5. Validar PWA:**

Use o **Lighthouse** no Chrome DevTools:
- Abra DevTools (F12)
- Aba **Lighthouse**
- Categoria: **Progressive Web App**
- Clique em **"Analyze page load"**

**Meta**: Score acima de 90/100 ✅

---

## 📊 Recursos Implementados

### ✅ **Fase 1: PWA Básico**
- [x] Manifest configurado (`manifest.webmanifest`)
- [x] Service Worker com Workbox
- [x] Ícones PWA (192x192 e 512x512)
- [x] Meta tags mobile (theme-color, apple-touch-icon)
- [x] Componente InstallPrompt (banner de instalação)
- [x] Página `/install` com instruções

### ✅ **Estratégias de Cache:**
- [x] Imagens: Cache-First (30 dias, máx 60 entradas)
- [x] APIs: Network-First (5 min, máx 50 entradas)
- [x] Assets estáticos: Precache automático

### 🔜 **Próximas Fases (Roadmap):**
- [ ] Notificações Push (Web Push API)
- [ ] Sincronização em Background (Background Sync)
- [ ] Compartilhamento nativo (Web Share API)
- [ ] Geolocalização para cálculo de frete
- [ ] Modo offline completo com IndexedDB

---

## 📖 Recursos Educacionais

### **Conceitos Implementados:**

#### **1. PWA vs Native vs Hybrid:**
- **PWA (atual)**: Web app instalável, funciona offline, sem lojas
- **Native**: App nativo (Java/Kotlin/Swift), melhor performance
- **Hybrid**: React Native/Flutter, código compartilhado

#### **2. Service Worker:**
Arquivo que roda em background e intercepta requisições de rede:
```javascript
// Cache-First: imagens
fetch(image) → Cache? → Sim → Retorna cache
              ↓ Não
         Network → Salva cache → Retorna
```

#### **3. Web App Manifest:**
JSON que define como o PWA se comporta:
- Nome do app
- Ícones
- Cores do tema
- Orientação (portrait/landscape)
- Modo de exibição (standalone/fullscreen)

#### **4. Install Prompt (beforeinstallprompt):**
Evento do navegador que permite customizar o prompt de instalação:
```typescript
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Impede banner automático
  // Mostra nosso banner customizado
});
```

---


### **Checklist de Deploy:**

- [ ] Build de produção sem erros (`npm run build`)
- [ ] Lighthouse PWA score > 90
- [ ] Testar instalação em Android e iOS
- [ ] Verificar ícones na tela inicial
- [ ] Testar modo offline
- [ ] Validar splash screen (iOS pode demorar)

---

## 📱 Páginas do Projeto

- `/home` - Página inicial com produtos
- `/install` - **NOVA**: Instruções de instalação
- `/profile` - Perfil do usuário
- `/orders` - Histórico de pedidos
- `/checkout` - Finalização de compra
- `/product/:id` - Detalhes do produto

---

## 🎓 Aplicação dos Conceitos Acadêmicos

### **Etapas do Ciclo de Desenvolvimento:**

1. **Análise**: Identificação da necessidade de app instalável
2. **Design**: Prototipação de ícones e fluxo de instalação
3. **Implementação**: Configuração PWA com Vite e Workbox
4. **Testes**: Lighthouse, testes em dispositivos reais
5. **Manutenção**: Monitoramento de cache e atualizações

### **Metodologias Ágeis Aplicadas:**

- **Scrum**: PWA implementado em sprint dedicado
- **Kanban**: Tasks divididas (manifest → service worker → icons → tests)
- **XP**: Refactoring contínuo, testes automatizados (Lighthouse)

---

## 📞 Suporte

Dúvidas sobre o PWA? Acesse `/install` no app ou consulte:
- [MDN Web Docs - PWA](https://developer.mozilla.org/pt-BR/docs/Web/Progressive_web_apps)
- [Google PWA Guide](https://web.dev/progressive-web-apps/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)

---


