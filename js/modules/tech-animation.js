import debounce from './debounce.js';

export default class tech {
  constructor(targetCards, targetTitle, targetText, targetContent) {
    this.targetCards = document.querySelectorAll(targetCards);
    this.targetTitle = document.querySelector(targetTitle);
    this.targetText = document.querySelector(targetText);
    this.targetContent = document.querySelector(targetContent);
    this.eventos = ['mouseover', 'click'];

    this.linguagens = [
      {
        nome: 'HTML5',
        texto:
          'HTML (HyperText Markup Language) é uma linguagem de marcação utilizada para estruturar e organizar o conteúdo de páginas web. Permite definir elementos como cabeçalhos, parágrafos, imagens e links, criando a base da estrutura de uma página.',
      },
      {
        nome: 'CSS3',
        texto:
          'CSS3 (Cascading Style Sheets) é uma linguagem de estilo que trabalha em conjunto com o HTML para controlar a apresentação e o layout das páginas web. Com recursos avançados, como transições, animações e seletores avançados, o CSS3 permite a criação de designs atrativos e responsivos.',
      },
      {
        nome: 'JavaScript ES6',
        texto:
          'JavaScript é uma linguagem de programação amplamente usada para adicionar interatividade e dinamismo às páginas web. Ele permite a manipulação do conteúdo da página em tempo real, respondendo a ações dos usuários e modificando elementos do HTML e do CSS de acordo com a lógica programada.',
      },

      {
        nome: 'TypeScript',
        texto:
          'TypeScript é uma linguagem de programação que se baseia em JavaScript, mas adiciona recursos de tipagem estática e orientação a objetos. Isso ajuda a prevenir erros durante o desenvolvimento, tornando o código mais robusto e legível, especialmente em projetos grandes.',
      },
      {
        nome: 'Node.js',
        texto:
          'Node.js é um ambiente de execução JavaScript construído sobre o motor V8. Permiti que você desenvolva aplicações usando JavaScript tanto no lado do cliente quanto no servidor. Podendo criar desde simples scripts até aplicações web complexas, APIs RESTful, servidores de aplicativos em tempo real e muito mais.',
      },
      {
        nome: 'React',
        texto:
          'React é uma biblioteca JavaScript amplamente usada para construir interfaces de usuário (UI) interativas e reutilizáveis. Baseado em componentes, o React facilita a criação de aplicativos web de página única (SPA) complexos, oferecendo uma abordagem mais eficiente para atualizar e renderizar partes específicas da página conforme os dados mudam.',
      },
      {
        nome: 'Next.js',
        texto:
          'Next.js é um framework de React que permite construir aplicações web modernas com facilidade. Ele oferece renderização do lado do servidor, roteamento simplificado, suporte a CSS e JavaScript modernos, além de uma gama de outras funcionalidades que facilitam o desenvolvimento de aplicações web de alto desempenho.',
      },
      {
        nome: 'Strapi',
        texto:
          'Strapi é um sistema de gerenciamento de conteúdo (CMS) de código aberto que permite criar APIs poderosas. Com Strapi, é possível criar, publicar e gerenciar o conteúdo de um aplicativo ou site de forma flexível, personalizada e escalável, oferecendo uma experiência de desenvolvimento sem complicações.',
      },
      {
        nome: 'PostgreSQL',
        texto:
          'PostgreSQL é um sistema de gerenciamento de banco de dados relacional de código aberto, conhecido por sua confiabilidade, robustez e recursos avançados. Ele oferece suporte completo para SQL, transações ACID, replicação, extensibilidade e uma ampla variedade de tipos de dados, Uma boa escolha para aplicações de todos os tamanhos e complexidades.',
      },
      {
        nome: 'Figma',
        texto:
          'O Figma é uma plataforma feita para projetar desde sites até aplicativos móveis e muito mais. Criando layouts, adicionando elementos gráficos e até mesmo definindo interações, é uma boa ferramenta para dar uma noção de como as partes visuais de um projeto com interface gráfica ficariam antes de sua implementação.',
      },
    ];
  }

  changeTextClicked() {
    const lista = [...this.targetCards];
    let activeCard = null; // Card ativo

    lista.forEach((card, index) => {
      card.addEventListener('mouseover', () => {
        if (activeCard !== card) {
          const linguagem = this.linguagens[index];
          this.targetContent.classList.add('ativo');

          if (
            index >= 0 &&
            linguagem.nome !== this.targetTitle.innerText &&
            linguagem.texto !== this.targetText.innerText
          ) {
            this.targetTitle.innerText = linguagem.nome;
            this.targetText.style.opacity = '1';
            this.targetText.innerText = linguagem.texto;
          }

          if (activeCard) {
            activeCard.classList.remove('ativo');
          }

          card.classList.add('ativo');
          activeCard = card;
        }
      });
      setTimeout(() => {
        card.addEventListener('mouseleave', () => {
          this.targetContent.classList.remove('ativo');
        });
      }, 5000);

      card.addEventListener('touchstart', () => {
        this.targetContent.classList.remove('ativo');
      });
    });
  }

  init() {
    this.changeTextClicked();
  }
}
