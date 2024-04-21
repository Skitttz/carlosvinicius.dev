import { sanitizeString } from './utils/sanitize';
import emailjs from '@emailjs/browser';

// Only non-production
// import {
//   API_EMAIL_PUBLIC_KEY,
//   API_EMAIL_TEMPLATE_ID,
//   API_EMAIL_SERVICE_ID,
// } from '../../env';

export default class ModalContact {
  constructor(
    modalSection,
    modalDiv,
    modalContainer,
    mainForm,
    btnOpenModal,
    btnCloseModal,
    inputName,
    inputEmail,
    inputSubject,
    inputMessage,
    btnSubmit,
  ) {
    //Elements
    this.modalSection = document.querySelector(modalSection);
    this.modalDiv = document.querySelector(modalDiv);
    this.modalContainer = document.querySelector(modalContainer);
    this.btnOpenModal = document.querySelectorAll(btnOpenModal);
    this.btnCloseModal = document.querySelector(btnCloseModal);
    this.mainForm = document.querySelector(mainForm);
    this.inputName = document.querySelector(inputName);
    this.inputEmail = document.querySelector(inputEmail);
    this.inputSubject = document.querySelector(inputSubject);
    this.inputMessage = document.querySelector(inputMessage);

    this.btnSubmit = document.querySelector(btnSubmit);

    // Function
    this.validateInput = this.validateInput.bind(this);
    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.clickOutModal = this.clickOutModal.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    //Message & others
    this.msgAlertSucess = 'Formulário enviado com sucesso.';
    this.msgAlertError = 'Ops! Erro ao enviar o formulário.';

    this.activeClass = 'ativo';
  }

  toggleModal() {
    this.modalSection.classList.toggle(this.activeClass);
  }

  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  clickOutModal(event) {
    if (event.target === this.modalDiv) {
      this.toggleModal();
    }
  }

  validateInput(valueInput) {
    if (valueInput !== '') {
      return true;
    }
    return false;
  }

  async sendEmail() {
    const valueInputName = this.inputName.value;
    const valueInputEmail = this.inputEmail.value;
    const valueInputSubject = this.inputSubject.value;
    const valueInputMessage = this.inputMessage.value;
    if (
      this.validateInput(valueInputName) &&
      this.validateInput(valueInputEmail) &&
      this.validateInput(valueInputSubject) &&
      this.validateInput(valueInputMessage)
    ) {
      const nameValue = sanitizeString(valueInputName);
      const emailValue = sanitizeString(valueInputEmail);
      const subjectValue = sanitizeString(valueInputSubject);
      const messageValue = sanitizeString(valueInputMessage);
      const templateParams = {
        from_name: nameValue,
        subject: subjectValue,
        message: messageValue,
        from_email: emailValue,
      };
      try {
        emailjs.send(
          process.env.API_EMAIL_SERVICE_ID,
          process.env.API_EMAIL_TEMPLATE_ID,
          templateParams,
          process.env.API_EMAIL_PUBLIC_KEY,
        );
        alert(this.msgAlertSucess);
        this.toggleModal();
      } catch (error) {
        console.error(error);
        alert(this.msgAlertError);
      }
    } else {
      alert('Preencha todos os campos');
    }
  }

  addModalEvents() {
    this.modalDiv.addEventListener('click', this.clickOutModal);
    this.btnCloseModal.addEventListener('click', this.eventToggleModal);
    for (const btn of this.btnOpenModal) {
      btn.addEventListener('click', this.eventToggleModal);
    }
    this.mainForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      await this.sendEmail();
    });
  }

  init() {
    if (this.btnOpenModal && this.btnCloseModal && this.modalContainer) {
      this.addModalEvents();
    }
  }
}
