import debounce from './debounce';

export default class ScrollAnimation {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowScreenSplit = window.innerHeight * 0.5;
    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
    this.divArrowUp = document.querySelector('.divArrow');
    this.activeClass = 'ativo';
    this.arrowSectionActive = 'aboutMe-bg ativo';
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
        item.element.classList.add(this.activeClass);
      } else if (item.element.classList.contains(this.activeClass)) {
        item.element.classList.remove(this.activeClass);
      }
    });

    const listSection = Array.from(this.sections).map((el) => {
      let valueSection = el.attributes.class.value;
      let result = valueSection.localeCompare(this.arrowSectionActive);
      if (result === 0) {
        setTimeout(() => {
          this.divArrowUp.classList.add(this.activeClass);
        }, 100);
      } else {
        setTimeout(() => {
          this.divArrowUp.classList.remove(this.activeClass);
        }, 100);
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener('scroll', this.checkDistance);
    }
    return this;
  }

  /* Remove o evento de Scroll */
  stop() {
    window.removeEventListener('scroll', this.checkDistance);
  }
}
