# Conversa Direito - Lisbon Law Website do Podcast Educacional

Um website moderno e elegante para um podcast educacional focado em Direito Português, dirigido a estudantes, académicos e professores.

## 🎨 Design

O website apresenta um design moderno com:
- **Efeito Glass**: Elementos com transparência e blur para um visual contemporâneo
- **Paleta de Cores**: 
  - Dourado principal: `#E8A845`
  - Verde principal: `#274F40`
- **Tipografia**: Inter font family para excelente legibilidade
- **Responsivo**: Design adaptável para todos os dispositivos

## ✨ Funcionalidades

### 🏠 Página Inicial
- Hero section com animações suaves
- Apresentação do podcast atual
- Botões de ação (Ouvir Agora, Subscrever)
- Elementos flutuantes animados

### 📻 Seção de Episódios
- Grid responsivo de episódios
- Informações detalhadas (duração, data)
- Botões de reprodução interativos
- Efeitos hover elegantes

### ℹ️ Sobre o Podcast
- Informações sobre o projeto
- Estatísticas do podcast
- Características principais
- Cards com efeito glass

### 📚 Recursos Educativos
- Guias de estudo
- Vídeos explicativos
- FAQ
- Acesso fácil aos materiais

### 📞 Contacto
- Formulário de contacto funcional
- Informações de contacto
- Validação de formulários
- Sistema de notificações

### 🎧 Funcionalidades Interativas
- Player de podcast simulado
- Barras de progresso animadas
- Navegação suave
- Menu mobile responsivo

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: 
  - CSS Grid e Flexbox
  - Variáveis CSS (Custom Properties)
  - Animações e transições
  - Efeitos glass (backdrop-filter)
- **JavaScript**: 
  - Interatividade
  - Validação de formulários
  - Animações no scroll
  - Sistema de notificações

## 📱 Responsividade

O website é totalmente responsivo e otimizado para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Como Executar

1. Clone ou descarregue os ficheiros
2. Abra o `index.html` num navegador web
3. Ou utilize um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js
   npx serve .
   
   # Com PHP
   php -S localhost:8000
   ```

## 📁 Estrutura do Projeto

```
direito-em-foco/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interativo
└── README.md           # Documentação
```

## 🎯 Seções do Website

### 1. Navegação
- Logo e menu principal
- Navegação mobile com hamburger menu
- Links suaves para todas as seções

### 2. Hero Section
- Título principal "Conversa Direito"
- Descrição do podcast
- Botões de ação
- Card do episódio atual

### 3. Episódios
- Grid de episódios recentes
- Informações detalhadas
- Botões de reprodução

### 4. Sobre
- História do podcast
- Estatísticas
- Características principais

### 5. Recursos
- Materiais educativos
- Links para recursos externos
- Organização por categorias

### 6. Contacto
- Formulário funcional
- Informações de contacto
- Validação em tempo real

### 7. Footer
- Links rápidos
- Redes sociais
- Newsletter
- Informações legais

## 🎨 Elementos de Design

### Glass Effect
```css
.glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Paleta de Cores
- **Dourado**: `#E8A845` - Elementos de destaque
- **Verde**: `#274F40` - Texto principal e elementos estruturais
- **Branco**: `#ffffff` - Fundos e texto claro
- **Cinzas**: Escala completa para hierarquia visual

### Animações
- Float animation para elementos decorativos
- Scroll-triggered animations
- Hover effects
- Smooth transitions

## 📊 Funcionalidades JavaScript

### Navegação
- Menu mobile toggle
- Smooth scrolling
- Navbar background change on scroll

### Formulários
- Validação de email
- Notificações de sucesso/erro
- Reset automático após envio

### Interatividade
- Player de podcast simulado
- Progress bars animadas
- Parallax effects
- Keyboard navigation

## 🔧 Personalização

### Cores
Edite as variáveis CSS no início do ficheiro `styles.css`:
```css
:root {
    --primary-gold: #E8A845;
    --primary-green: #274F40;
    /* ... outras cores */
}
```

### Conteúdo
- Substitua o texto em português no `index.html`
- Atualize as informações de contacto
- Modifique os episódios e recursos

### Funcionalidades
- Adicione integração com APIs de podcast
- Implemente um sistema de comentários
- Adicione funcionalidades de busca

## 📈 Performance

O website está otimizado para:
- Carregamento rápido
- Animações suaves
- Scroll performance
- Mobile performance

## 🌐 Compatibilidade

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers

## 📝 Licença

Este projeto é de código aberto e pode ser utilizado livremente para fins educacionais e comerciais.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie uma branch para a sua feature
3. Commit as suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para questões ou suporte, contacte através do formulário no website ou envie um email para info@direitoemfoco.pt

---

**Desenvolvido com ❤️ para a comunidade educacional de Direito Português** 