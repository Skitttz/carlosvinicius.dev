import debounce from "./debounce";

export default class ScrollAnimation {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowScreenSplit = window.innerHeight * 0.5;
    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  /* Captura a distancia de cada objeto ao topo do site */
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowScreenSplit),
      };
    });
  }

  /* Verificacao de Distancia do Scroll de cada objeto em relacao ao site */
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add("ativo");
      } else if (item.element.classList.contains("ativo")) {
        item.element.classList.remove("ativo");
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener("scroll", this.checkDistance);
    }
    return this;
  }

  /* Remove o evento de Scroll */
  stop() {
    window.removeEventListener("scroll", this.checkDistance);
  }
}
