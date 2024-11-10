import TypeIt from 'typeit';
import Panel from './createPanel.js';

const animationData = JSON.parse(localStorage.getItem('animationData') || '{}');
const animationDelayRemoveStorage = 3 * 60 * 1000;

function showFinalContent(panel) {
  const textElement = document.getElementById('text');
  const consoleElement = document.getElementById('consoleType');
  let currentLanguage = localStorage.getItem("language") ?? 'pt';
  let isLanguagePTBR = currentLanguage === 'pt';
  textElement.innerHTML = `
    <p data-en="Hi, I am" data-ptbr="Olá, sou">${isLanguagePTBR ? "Olá, sou" : "Hi, I am"}</p>
    <span class="myName">Carlos Vinicius,</span>
    <section class="panelSection"></section>
  `;
  consoleElement.textContent = isLanguagePTBR ? 'Desenvolvedor Front-End' : 'Front-End Developer';
  panel.Aparecer();
}

function disableSwitchButton() {
  const switchButton = document.querySelector('.language-switch-button');
  if (switchButton) {
    switchButton.disabled = true;
  }
}

function enableSwitchButton() {
  const switchButton = document.querySelector('.language-switch-button');
  if (switchButton) {
    switchButton.disabled = false;
  }
}

function firstAnimationLanguage(){
  let currentLanguage = localStorage.getItem("language") ?? 'pt';
  const structureType = {
    pt: {
      text1: "olá",
      text2: ", sou ",
      text3: " O",
      text4: " C",
      text5: "programad",
      text6: "console.log('",
      textAtip: "s",
      text7: "envolvedor ",
      text8: "Front-End",
      text9: "');",
      text10: "<section class='panelSection'></section>"
    },
    en: {
      text1: "hi",
      text2: ", I am ",
      text3: " H",
      text4: " C",
      text5: "programme",
      text6: "console.log('",
      textAtip: "v",
      text7: "eloper ",
      text8: "Front-End",
      text9: "');",
      text10: "<section class='panelSection'></section>"
    }
  };
  

  return structureType[currentLanguage]; 

}

function Type(panel) {
  const animationStructure = firstAnimationLanguage();

  const typeA = new TypeIt('#text', {
    lifeLike: false,
    speed: 50,
    startDelay: 900,
    afterComplete: function (typeA) {
      typeA.destroy();
      panel.Aparecer();
      enableSwitchButton(); 
      showFinalContent();
    },
  })
    .type(animationStructure.text1, { delay: 100 })
    .type(animationStructure.text2)
    .pause(448)
    .move(null, { to: 'START', instant: true, delay: 300 })
    .move(1, { delay: 200 })
    .delete(1)
    .type(animationStructure.text3, { delay: 225 })
    .pause(200)
    .move(7, { instant: true })
    .pause(348)
    .type(animationStructure.text4)
    .pause(1000)
    .delete(1)
    .type('<p></p>')
    .type(" <span class='myName'>Carlos Vinicius,</span>")
    .pause(348)
    .break()
    .pause(200)
    .type(' </p> ')
    .pause(116)
    .type(' ')
    .pause(135)
    .type(animationStructure.text5)
    .delete(1)
    .pause(164)
    .delete(1)
    .pause(157)
    .delete(1)
    .pause(132)
    .delete(1)
    .pause(148)
    .delete(1)
    .pause(160)
    .delete(1)
    .pause(168)
    .delete(1)
    .pause(169)
    .delete(1)
    .pause(167)
    .delete(1)
    .pause(132)
    .type(animationStructure.text6)
    .pause(200)
    .type('d')
    .pause(64)
    .type('e')
    .pause(64)
    .type('v')
    .pause(64)
    .delete(1)
    .pause(194)
    .delete(1)
    .pause(183)
    .delete(1)
    .pause(284)
    .type('D')
    .pause(93)
    .type('e')
    .pause(150)
    .type(animationStructure.textAtip)
    .pause(300)
    .type(animationStructure.text7, { delay: 500 })
    .pause(150)
    .type(animationStructure.text8, { delay: 300 })
    .pause(200)
    .type(animationStructure.text9)
    .pause(1000)
    .delete(40, { instant: true })
    .pause(100)
    .type(animationStructure.text10)
    .go();
}



function TypeConsole(panel) {
  const typeB = new TypeIt('#consoleType', {
    cursor:false,
    lifeLike: false,
    speed: 50,
    startDelay: 900,
    afterComplete: function () {
      panel.pressKey('Enter');
    },
  }).go();
}

export default function TypeF() {
  const panel = new Panel();
  
  if (shouldResetAnimation(animationData.lastExecutionTime)) {
    localStorage.removeItem('animationData');
    animationData.executed = false;
  }

  if (animationData.executed) {
    showFinalContent(panel);
    panel.pressKey('Enter');
    return;
  }

  disableSwitchButton();
  Type(panel);
  TypeConsole(panel);

  localStorage.setItem(
    'animationData',
    JSON.stringify({
      executed: true,
      lastExecutionTime: Date.now(),
    }),
  );
}

function shouldResetAnimation(lastExecutionTime) {
  if (!lastExecutionTime) return false;

  const currentTime = Date.now();
  const timeDifference = currentTime - lastExecutionTime;
  return timeDifference >= animationDelayRemoveStorage;
}
