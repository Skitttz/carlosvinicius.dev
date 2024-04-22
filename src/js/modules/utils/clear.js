export default function clearInputs(...inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}
