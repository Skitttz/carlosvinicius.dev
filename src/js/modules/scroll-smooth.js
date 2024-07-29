export default class ScrollSmooth {
  constructor(links, logo) {
    this.linksInternos = document.querySelectorAll(links);
    this.logo = document.querySelector(logo);

    //Arrow
    this.arrowUp = document.querySelector('.arrowUpLink');
    this.scrollToSection = this.scrollToSection.bind(this);
  }

  scrollToSection(event, options) {
    event.preventDefault();
    let sectionHomeValue = 0,
      sectionAboutValue = 0.98,
      sectionProjectValue = 0.95;
    const href = event.currentTarget.getAttribute('href');
    const section = document.querySelector(href);
    let viewPortWidth = window.innerWidth;
    let topSection = section.offsetTop;
    switch (href) {
      case href === '#home':
        topSection = sectionHomeValue;
        break;
      case href === '#about':
        topSection *= viewPortWidth >= 600 ? sectionAboutValue : 0.94;
        break;
      case href === '#project':
        topSection *= viewPortWidth >= 600 ? sectionProjectValue : 0.85;
        break;
      default:
        break;
    }
    if (options === undefined) {
      options = { top: topSection, behavior: 'smooth' };
    } else {
      this.options = options;
    }
    window.scrollTo(options);
  }

  addLinkEvent() {
    const eventos = ['click', 'touchstart'];

    eventos.forEach((evento) => {
      this.linksInternos.forEach((link) => {
        link.addEventListener(evento, this.scrollToSection);
      });
    });

    /* set section to logo (home) */
    eventos.forEach((e) => this.logo.addEventListener(e, this.scrollToSection));
    /* set section to logo (arrow) */
    eventos.forEach((e) =>
      this.arrowUp.addEventListener(e, this.scrollToSection),
    );
  }

  init() {
    if (this.linksInternos.length) {
      this.addLinkEvent();
    }
    return this;
  }
}
