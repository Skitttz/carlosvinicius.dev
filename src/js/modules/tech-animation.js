import debounce from './debounce.js';

export default class Tech {
  constructor(targetCards, targetTitle, targetText, targetContent) {
    this.targetCards = document.querySelectorAll(targetCards);
    this.targetTitle = document.querySelector(targetTitle);
    this.targetText = document.querySelector(targetText);
    this.targetContent = document.querySelector(targetContent);
    this.eventos = ['mouseover', 'click'];

    this.linguagens = [
      {
        nome: {
          pt: '▰ HTML5',
          en: '▰ HTML5',
        },
        texto: {
          pt: 'HTML (HyperText Markup Language) é uma linguagem de marcação utilizada para estruturar e organizar o conteúdo de páginas web. Permite definir elementos como cabeçalhos, parágrafos, imagens e links, criando a base da estrutura de uma página.',
          en: 'HTML (HyperText Markup Language) is a markup language used to structure and organize web page content. It allows you to define elements such as headers, paragraphs, images, and links, creating the foundation of a page structure.',
        },
      },
      {
        nome: {
          pt: '▱ CSS3',
          en: '▱ CSS3',
        },
        texto: {
          pt: 'CSS3 (Cascading Style Sheets) é uma linguagem de estilo que trabalha em conjunto com o HTML para controlar a apresentação e o layout das páginas web. Com recursos avançados, como transições, animações e seletores avançados, o CSS3 permite a criação de designs atrativos e responsivos.',
          en: 'CSS3 (Cascading Style Sheets) is a styling language that works together with HTML to control the presentation and layout of web pages. With advanced features such as transitions, animations, and advanced selectors, CSS3 enables the creation of attractive and responsive designs.',
        },
      },
      {
        nome: {
          pt: '▰ JavaScript ES6',
          en: '▰ JavaScript ES6',
        },
        texto: {
          pt: 'JavaScript é uma linguagem de programação amplamente usada para adicionar interatividade e dinamismo às páginas web. Ele permite a manipulação do conteúdo da página em tempo real, respondendo a ações dos usuários e modificando elementos do HTML e do CSS de acordo com a lógica programada.',
          en: 'JavaScript is a programming language widely used to add interactivity and dynamism to web pages. It allows real-time manipulation of page content, responding to user actions and modifying HTML and CSS elements according to the programmed logic.',
        },
      },
      {
        nome: {
          pt: '▱ TypeScript',
          en: '▱ TypeScript',
        },
        texto: {
          pt: 'TypeScript é uma linguagem de programação que se baseia em JavaScript, mas adiciona recursos de tipagem estática e orientação a objetos. Isso ajuda a prevenir erros durante o desenvolvimento, tornando o código mais robusto e legível, especialmente em projetos grandes.',
          en: 'TypeScript is a programming language based on JavaScript, but adds features like static typing and object-oriented programming. This helps prevent errors during development, making the code more robust and readable, especially in large projects.',
        },
      },
      {
        nome: {
          pt: '▰ Node.js',
          en: '▰ Node.js',
        },
        texto: {
          pt: 'Node.js é um ambiente de execução JavaScript construído sobre o motor V8. Permite que você desenvolva aplicações usando JavaScript tanto no lado do cliente quanto no servidor. Podendo criar desde simples scripts até aplicações web complexas, APIs RESTful, servidores de aplicativos em tempo real e muito mais.',
          en: 'Node.js is a JavaScript runtime environment built on the V8 engine. It allows you to develop applications using JavaScript on both the client and server side. You can create everything from simple scripts to complex web applications, RESTful APIs, real-time application servers, and much more.',
        },
      },
      {
        nome: {
          pt: '▱ React',
          en: '▱ React',
        },
        texto: {
          pt: 'React é uma biblioteca JavaScript amplamente usada para construir interfaces de usuário (UI) interativas e reutilizáveis. Baseado em componentes, o React facilita a criação de aplicativos web de página única (SPA) complexos, oferecendo uma abordagem mais eficiente para atualizar e renderizar partes específicas da página conforme os dados mudam.',
          en: 'React is a JavaScript library widely used to build interactive and reusable user interfaces (UI). Based on components, React makes it easier to create complex single-page web applications (SPAs), providing a more efficient way to update and render specific parts of the page as data changes.',
        },
      },
      {
        nome: {
          pt: '▰ Next.js',
          en: '▰ Next.js',
        },
        texto: {
          pt: 'Next.js é um framework de React que permite construir aplicações web modernas com facilidade. Ele oferece renderização do lado do servidor, roteamento simplificado, suporte a CSS e JavaScript modernos, além de uma gama de outras funcionalidades que facilitam o desenvolvimento de aplicações web de alto desempenho.',
          en: 'Next.js is a React framework that makes it easy to build modern web applications. It offers server-side rendering, simplified routing, support for modern CSS and JavaScript, and a range of other features that make high-performance web application development easier.',
        },
      },
      {
        nome: {
          pt: '▱ Strapi',
          en: '▱ Strapi',
        },
        texto: {
          pt: 'Strapi é um sistema de gerenciamento de conteúdo (CMS) de código aberto que permite criar APIs poderosas. Com Strapi, é possível criar, publicar e gerenciar o conteúdo de um aplicativo ou site de forma flexível, personalizada e escalável, oferecendo uma experiência de desenvolvimento sem complicações.',
          en: 'Strapi is an open-source content management system (CMS) that allows you to create powerful APIs. With Strapi, you can create, publish, and manage the content of an app or website in a flexible, customized, and scalable way, offering a hassle-free development experience.',
        },
      },
      {
        nome: {
          pt: '▰ PostgreSQL',
          en: '▰ PostgreSQL',
        },
        texto: {
          pt: 'PostgreSQL é um sistema de gerenciamento de banco de dados relacional de código aberto, conhecido por sua confiabilidade, robustez e recursos avançados. Ele oferece suporte completo para SQL, transações ACID, replicação, extensibilidade e uma ampla variedade de tipos de dados, Uma boa escolha para aplicações de todos os tamanhos e complexidades.',
          en: 'PostgreSQL is an open-source relational database management system, known for its reliability, robustness, and advanced features. It offers full support for SQL, ACID transactions, replication, extensibility, and a wide variety of data types, making it a great choice for applications of all sizes and complexities.',
        },
      },
      {
        nome: {
          pt: '▱ Figma',
          en: '▱ Figma',
        },
        texto: {
          pt: 'O Figma é uma plataforma feita para projetar desde sites até aplicativos móveis e muito mais. Criando layouts, adicionando elementos gráficos e até mesmo definindo interações, é uma boa ferramenta para dar uma noção de como as partes visuais de um projeto com interface gráfica ficariam antes de sua implementação.',
          en: 'Figma is a platform designed to design everything from websites to mobile apps and much more. Creating layouts, adding graphic elements, and even defining interactions, it’s a great tool to get a sense of how the visual parts of a project with a graphical interface would look before implementation.',
        },
      },
    ];
  }

  changeTextClicked() {
    const lista = [...this.targetCards];
    let activeCard = null;

    lista.forEach((card, index) => {
      card.addEventListener('mouseover', () => {
        if (activeCard !== card) {
          const linguagem = this.linguagens[index];
          this.targetContent.classList.add('ativo');

          const language = localStorage.getItem('language') || 'pt'; 

          const nome = linguagem.nome[language];
          const texto = linguagem.texto[language];

          if (index >= 0 && nome !== this.targetTitle.innerText && texto !== this.targetText.innerText) {
            this.targetTitle.innerText = nome;
            this.targetText.style.opacity = '1';
            this.targetText.innerText = texto;
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
