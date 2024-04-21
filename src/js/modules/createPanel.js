export default class Panel {
  constructor() {
    const panel = document.querySelector('.panelSection');
    const textArea = document.querySelector('.textArea');
    const loading = document.querySelector('.loading');
    const html = document.querySelector('html');

    // Elements press enter
    const elementProject = document.getElementById('project');
    let count = 0;
    let offset = -100;

    this.loading = loading;
    this.panel = panel;
    this.textArea = textArea;
    this.html = html;
    this.Aparecer = this.Aparecer.bind(this);

    // Elements press enter (this)
    this.elementProject = elementProject;
    this.count = count;
    this.offset = offset;
  }

  Aparecer() {
    this.panel.classList.toggle('ativo');
    this.loading.classList.toggle('ativo');
    setTimeout(() => {
      this.loading.classList.toggle('ativo');
      this.textArea.style.display = 'block';
    }, 1000);
  }
  Desaparecer() {
    this.panel.classList.remove('ativo');
  }

  pressKey(keyP) {
    this.html.addEventListener('keydown', (e) => {
      if (e.key == keyP && this.count === 0) {
        this.Desaparecer();
        let elementPosition = this.elementProject.getBoundingClientRect().top;
        let offsetPosition = elementPosition + window.scrollY + this.offset;
        setTimeout(function () {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 500);
        this.count = 1;
      }
    });
  }

  animarTransicao() {
    panelElement.style.transform = 'translateY(100px)';
  }
}
