import debounce from "./debounce.js";

export default class tech {
  constructor(targetCards, targetTitle, targetText, targetContent) {
    this.targetCards = document.querySelectorAll(targetCards);
    this.targetTitle = document.querySelector(targetTitle);
    this.targetText = document.querySelector(targetText);
    this.targetContent = document.querySelector(targetContent);
    this.eventos = ["mouseover", "click"];

    this.linguagens = [
      {
        nome: "HTML5",
        texto:
          "HTML (HyperText Markup Language) é uma linguagem de marcação utilizada para estruturar e organizar o conteúdo de páginas web. Permite definir elementos como cabeçalhos, parágrafos, imagens e links, criando a base da estrutura de uma página.",
      },
      {
        nome: "CSS3",
        texto:
          "CSS3 (Cascading Style Sheets) é uma linguagem de estilo que trabalha em conjunto com o HTML para controlar a apresentação e o layout das páginas web. Com recursos avançados, como transições, animações e seletores avançados, o CSS3 permite a criação de designs atrativos e responsivos.",
      },
      {
        nome: "JavaScript ES6",
        texto:
          "JavaScript é uma linguagem de programação amplamente usada para adicionar interatividade e dinamismo às páginas web. Ele permite a manipulação do conteúdo da página em tempo real, respondendo a ações dos usuários e modificando elementos do HTML e do CSS de acordo com a lógica programada.",
      },
      {
        nome: "TypeScript",
        texto:
          "TypeScript é uma linguagem de programação que se baseia em JavaScript, mas adiciona recursos de tipagem estática e orientação a objetos. Isso ajuda a prevenir erros durante o desenvolvimento, tornando o código mais robusto e legível, especialmente em projetos grandes.",
      },
      {
        nome: "React",
        texto:
          "React é uma biblioteca JavaScript amplamente usada para construir interfaces de usuário (UI) interativas e reutilizáveis. Baseado em componentes, o React facilita a criação de aplicativos web de página única (SPA) complexos, oferecendo uma abordagem mais eficiente para atualizar e renderizar partes específicas da página conforme os dados mudam.",
      },
    ];
  }

  changeTextClicked() {
    const lista = [...this.targetCards];
    let activeCard = null; // Card ativo

    lista.forEach((card, index) => {
      card.addEventListener("mouseover", () => {
        if (activeCard !== card) {
          const linguagem = this.linguagens[index];
          this.targetContent.classList.add("ativo");

          if (
            index >= 0 &&
            linguagem.nome !== this.targetTitle.innerText &&
            linguagem.texto !== this.targetText.innerText
          ) {
            this.targetTitle.innerText = linguagem.nome;
            this.targetText.style.opacity = "1";
            this.targetText.innerText = linguagem.texto;
          }

          if (activeCard) {
            activeCard.classList.remove("ativo");
          }

          card.classList.add("ativo");
          activeCard = card;
        }
      });
      setTimeout(() => {
        card.addEventListener("mouseleave", () => {
          this.targetContent.classList.remove("ativo");
        });
      }, 5000);

      card.addEventListener("touchstart", () => {
        this.targetContent.classList.remove("ativo");
      });
    });
  }

  init() {
    this.changeTextClicked();
  }
}
