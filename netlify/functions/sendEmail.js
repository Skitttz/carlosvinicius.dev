import emailjs from '@emailjs/browser';
import fetch from 'node-fetch';

export const handler = async (event) => {
  const {
    valueInputName,
    valueInputEmail,
    valueInputSubject,
    valueInputMessage,
  } = JSON.parse(event.body);

  const { API_EMAIL_SERVICE_ID, API_EMAIL_PUBLIC_KEY, API_EMAIL_TEMPLATE_ID } =
    process.env;

  if (
    valueInputName &&
    valueInputEmail &&
    valueInputSubject &&
    valueInputMessage
  ) {
    const nameValue = valueInputName;
    const emailValue = valueInputEmail;
    const subjectValue = valueInputSubject;
    const messageValue = valueInputMessage;

    const templateParams = {
      from_name: nameValue,
      subject: subjectValue,
      message: messageValue,
      from_email: emailValue,
    };

    try {
      emailjs.send(
        API_EMAIL_SERVICE_ID,
        API_EMAIL_TEMPLATE_ID,
        templateParams,
        API_EMAIL_PUBLIC_KEY,
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'E-mail enviado com sucesso!' }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Erro ao enviar o e-mail' }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Preencha todos os campos' }),
    };
  }
};
