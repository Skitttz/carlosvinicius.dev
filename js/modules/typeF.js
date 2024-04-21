import TypeIt from 'typeit';
import Panel from './createPanel.js';

export default function TypeF() {
  const panel = new Panel();
  function Type() {
    const typeA = new TypeIt('#text', {
      lifeLike: false,
      speed: 50,
      startDelay: 900,
      afterComplete: function (typeA) {
        typeA.destroy();
        panel.Aparecer();
      },
    })
      .type('olá', { delay: 100 })
      .type(', sou ')
      .pause(448)
      .move(null, { to: 'START', instant: true, delay: 300 })
      .move(1, { delay: 200 })
      .delete(1)
      .type('O', { delay: 225 })
      .pause(200)
      .move(7, { instant: true })
      .pause(348)
      .type(' C')
      .pause(1000)
      .delete(1)
      .type('<p></p>')
      .type(" <span class='myName'>Carlos Vinicius,</span>")
      .pause(348)
      .break()
      .pause(200)
      .type(' ')
      .pause(116)
      .type(' ')
      .pause(135)
      .type('programad')
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
      .type("console.log('")
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
      .type('s')
      .pause(300)
      .type('envolvedor ', { delay: 500 })
      .pause(150)
      .type('Front-End', { delay: 300 })
      .pause(200)
      .type('.')
      .type("');")
      .pause(1000)
      .delete(40, { instant: true })
      .pause(100)
      .type("<section class='panelSection'></section>")
      .go();
  }
  Type();

  function TypeConsole() {
    const typeB = new TypeIt('#consoleType', {
      cursorChar: '▍',
      strings: 'Desenvolvedor Front-End.',
      lifeLike: false,
      speed: 50,
      startDelay: 900,
      afterComplete: function (typeB) {
        panel.pressKey('Enter');
      },
    }).go();
  }
  TypeConsole();
}
