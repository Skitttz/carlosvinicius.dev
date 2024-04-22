import emailjs from "@emailjs/nodejs";

export const handler = async (event) => {
  console.log(event);
  const {
    API_EMAIL_SERVICE_ID,
    API_EMAIL_PUBLIC_KEY,
    API_EMAIL_PRIVATE_KEY,
    API_EMAIL_TEMPLATE_ID,
  } = process.env;

  emailjs.init({
    publicKey: API_EMAIL_PUBLIC_KEY,
    privateKey: API_EMAIL_PRIVATE_KEY,
  });

  let body = {};
  body = JSON.parse(event.body);
  if (
    body.nameValue &&
    body.emailValue &&
    body.subjectValue &&
    body.messageValue
  ) {
    const templateParams = {
      from_name: body.nameValue,
      subject: body.subjectValue,
      message: body.messageValue,
      from_email: body.emailValue,
    };
    try {
      await emailjs.send(
        API_EMAIL_SERVICE_ID,
        API_EMAIL_TEMPLATE_ID,
        templateParams,
      );
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "E-mail enviado com sucesso!" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Erro ao enviar o e-mail" }),
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Preencha todos os campos" }),
    };
  }
};
