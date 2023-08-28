export default class Panel {
  constructor() {
    const panel = document.querySelector(".panelSection");
    const textArea = document.querySelector(".textArea");
    const loading = document.querySelector(".loading");
    const html = document.querySelector("html");
    this.loading = loading;
    this.panel = panel;
    this.textArea = textArea;
    this.html = html;
    this.Aparecer = this.Aparecer.bind(this);
  }

  Aparecer() {
    this.panel.classList.toggle("ativo");
    this.loading.classList.toggle("ativo");
    setTimeout(() => {
      this.loading.classList.toggle("ativo");
      this.textArea.style.display = "block";
    }, 1000);
  }
  Desaparecer() {
    this.panel.classList.remove("ativo");
  }

  pressKey(keyP) {
    this.html.addEventListener("keydown", (e) => {
      if (e.key == keyP) {
        this.Desaparecer();
      }
    });
  }

  animarTransicao() {
    panelElement.style.transform = "translateY(100px)";
  }
}
