import sanitizeString from "./utils/sanitize";
import validateInput from "./utils/validate";
import clearInputs from "./utils/clear";
import Toastify from "toastify-js";

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
    this.mainForm = document.querySelector(mainForm);

    //Buttons
    this.btnOpenModal = document.querySelectorAll(btnOpenModal);
    this.btnCloseModal = document.querySelector(btnCloseModal);

    //Inputs
    this.inputName = document.querySelector(inputName);
    this.inputEmail = document.querySelector(inputEmail);
    this.inputSubject = document.querySelector(inputSubject);
    this.inputMessage = document.querySelector(inputMessage);

    this.btnSubmit = document.querySelector(btnSubmit);

    // Function
    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.clickOutModal = this.clickOutModal.bind(this);
    this.sendEmail = this.sendEmail.bind(this);

    //Message & others
    this.msgAlertSucess = "Mensagem enviada com sucesso!";
    this.msgAlertError = "Ops! Erro ao enviar a mensagem";

    this.activeClass = "ativo";
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

  async sendEmail() {
    let loading = true;
    if (loading && this.btnSubmit) {
      this.btnSubmit.innerText = "Enviando...";
    }
    const valueInputName = this.inputName.value;
    const valueInputEmail = this.inputEmail.value;
    const valueInputSubject = this.inputSubject.value;
    const valueInputMessage = this.inputMessage.value;
    if (
      validateInput(valueInputName) &&
      validateInput(valueInputEmail) &&
      validateInput(valueInputSubject) &&
      validateInput(valueInputMessage)
    ) {
      const nameValue = sanitizeString(valueInputName);
      const emailValue = sanitizeString(valueInputEmail);
      const subjectValue = sanitizeString(valueInputSubject);
      const messageValue = sanitizeString(valueInputMessage);

      const requestBody = JSON.stringify({
        nameValue,
        emailValue,
        subjectValue,
        messageValue,
      });
      try {
        const response = await fetch("/.netlify/functions/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });
        loading = false;
        if (this.btnSubmit && !loading) {
          this.btnSubmit.innerText = "Enviar mensagem";
          clearInputs(
            this.inputName,
            this.inputEmail,
            this.inputSubject,
            this.inputMessage,
          );
        }
        if (!response.ok) {
          throw new Error(
            "Erro ao enviar o e-mail. Por favor, tente novamente mais tarde.",
          );
        }
        Toastify({
          text: this.msgAlertSucess,
          duration: 5000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            color: "white",
            background: "linear-gradient(to right, #31258a, #5443cc)",
          },
        }).showToast();
        this.toggleModal();
      } catch (error) {
        console.error(error);
        Toastify({
          text: this.msgAlertError,
          duration: 6000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            color: "white",
            background: "linear-gradient(to right, #851111, #a81111)",
          },
        }).showToast();
      }
    } else {
      alert("Preencha todos os campos");
    }
  }

  addModalEvents() {
    this.modalDiv.addEventListener("click", this.clickOutModal);
    this.btnCloseModal.addEventListener("click", this.eventToggleModal);
    for (const btn of this.btnOpenModal) {
      btn.addEventListener("click", this.eventToggleModal);
    }
    this.mainForm.addEventListener("submit", async (event) => {
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
