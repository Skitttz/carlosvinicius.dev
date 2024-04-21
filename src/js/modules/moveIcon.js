export default class moveIcon {
  constructor(target, icon) {
    this.target = document.querySelector(target);
    this.icon = document.querySelector(icon);
    this.move = this.move.bind(this);
    this.disapear = this.disapear.bind(this);
  }

  move() {
    this.icon.style.transform = "translate3d(0, 8px, 0)";
  }

  disapear() {
    this.icon.style.transform = "translate3d(0, 0px, 0)";
  }

  addEventMove() {
    this.target.addEventListener("mouseover", this.move);
    this.target.addEventListener("mouseout", () => {
      this.disapear();
    });
  }

  init() {
    this.addEventMove();
  }
}
