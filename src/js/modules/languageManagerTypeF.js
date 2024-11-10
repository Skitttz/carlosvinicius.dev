class LanguageManagerTypeF {
    constructor() {
      this.language = localStorage.getItem('language') || 'pt';
  
      this.translations = {
        pt: {
          greeting: 'Olá, sou',
          name: 'Carlos Vinicius',
          profession: 'Desenvolvedor Front-End',
          consoleText: 'console.log(\'Desenvolvedor Front-End\');',
        },
        en: {
          greeting: 'Hello, I am',
          name: 'Carlos Vinicius',
          profession: 'Front-End Developer',
          consoleText: "console.log('Front-End Developer');",
        },
      };
    }
  
    setLanguage(lang) {
      this.language = lang;
      localStorage.setItem('language', lang);
    }
  
    getText(key) {
      return this.translations[this.language][key] || key;
    }
  }
  
  export default new LanguageManagerTypeF();
  