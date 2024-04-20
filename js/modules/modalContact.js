export default class ModalContact {
  constructor(
    modalSection,
    modalDiv,
    btnOpenModal,
    btnCloseModal,
    inputName,
    inputEmail,
    inputSubject,
    inputMessage,
  ) {
    this.modalSection = document.querySelector(modalSection);
    this.modalDiv = document.querySelector(modalDiv);
    this.btnOpenModal = document.querySelector(btnOpenModal);
    this.btnCloseModal = document.querySelector(btnCloseModal);
    this.inputName = document.querySelector(inputName);
    this.inputEmail = document.querySelector(inputEmail);
    this.inputSubject = document.querySelector(inputSubject);
    this.inputMessage = document.querySelector(inputMessage);

    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.activeClass = "ativo";
  }

  toggleModal() {
    this.modalSection.classList.toggle(this.activeClass);
  }

  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  addModalEvents() {
    this.btnOpenModal.addEventListener("click", this.eventToggleModal);
    this.btnCloseModal.addEventListener("click", this.eventToggleModal);
  }

  async sendEmail() {}

  init() {
    this.addModalEvents();
  }
}
