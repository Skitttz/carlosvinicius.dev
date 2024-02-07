export function generateRandomRGB() {
  var r = Math.floor(Math.random() * 256); // Valor aleatório para o canal de vermelho
  var g = Math.floor(Math.random() * 256); // Valor aleatório para o canal de verde
  var b = Math.floor(Math.random() * 256); // Valor aleatório para o canal de azul

  return 'rgba(' + r + ', ' + g + ', ' + b + ')';
}
