import { marked } from 'marked';
import * as DOMPurify from 'dompurify';
import { generateRandomRGB } from './randomRGB';

export default class RepositoryGit {
  constructor(bodyRepository) {
    this.bodyRepository = document.querySelectorAll(bodyRepository);
    this.slideContainer = document.querySelector('.slide');
  }

  renderizeCodeTag() {
    let codeElements = document.querySelectorAll('code');
    codeElements.forEach(function (codeElement) {
      let liElement = codeElement.parentElement;
      liElement.classList.add('liDoCode');
    });
  }

  clearTopicsHyperLink() {
    let divElements = document.querySelectorAll('.body-repository');
    const objectTopicsHref = {
      0: { id: 0, href: '#contexto-' },
      1: { id: 1, href: '#contexto' },
      2: { id: 2, href: '#tecnologias-%EF%B8%8F' },
      3: { id: 3, href: '#desafios-' },
      4: { id: 4, href: '#como-acessar-' },
      5: { id: 5, href: '#design-' },
      6: { id: 6, href: '#passos-para-testar-' },
      7: { id: 7, href: '#wireframe-e-prototipo-' },
    };

    if (divElements) {
      divElements.forEach((divElement) => {
        let titleRandomColors = generateRandomRGB();
        // Seleciona todos os hiperlinks dentro da div
        if (divElement) {
          let pElement = divElement.querySelector('p');
          pElement.classList.add('containerTopic');
        }
        let links = divElement.querySelectorAll('a');

        // Itera sobre os hiperlinks
        links.forEach((linkElement) => {
          for (const key in objectTopicsHref) {
            if (
              objectTopicsHref.hasOwnProperty(key) &&
              objectTopicsHref[key].href === linkElement.getAttribute('href')
            ) {
              let topicElement = document.createElement('span');
              topicElement.textContent = linkElement.textContent;
              linkElement.parentNode.replaceChild(topicElement, linkElement);
              topicElement.classList.add('titleTopic');
              topicElement.style.backgroundColor = titleRandomColors;

              break;
            }
          }
        });
      });
    }
  }
  transformArchorToVideo(src) {
    let linkElement = document.querySelector(`a[href="${src}"]`);
    if (linkElement) {
      let videoURL = linkElement.href;
      let videoElement = document.createElement('video');
      videoElement.src = videoURL;
      videoElement.controls = true;
      videoElement.width = 360;
      videoElement.height = 270;
      linkElement.parentNode.replaceChild(videoElement, linkElement);
    } else {
      console.error('Elemento <a> não encontrado.');
    }
  }

  allLinksBlank(tagName) {
    let links = document.querySelectorAll(tagName);
    links.forEach((link) => {
      if (link.href) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    });
  }

  async getDataUserGit(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      const numRepos = data.public_repos;
      return numRepos;
    } catch (error) {
      console.error(error);
    }
  }

  async createElements(username) {
    try {
      const response = await fetch(
        `https://pinned.berrysauce.me/get/${username}`,
      );
      const data = await response.json();
      for (let index = 0; index < data.length; index++) {
        //Criar Li
        let listItem = document.createElement('li');
        listItem.className = 'content-body-repository';
        //Criar Div
        let divElement = document.createElement('div');
        divElement.className = 'body-repository';

        //Colocar div dentro do Li
        listItem.appendChild(divElement);

        //Colocar Li dentro do UL slide
        this.slideContainer.appendChild(listItem);
      }
    } catch (error) {
      console.error('[Error Criar Elementos do Slide]:', error);
    } finally {
      this.bodyRepository = document.querySelectorAll('.body-repository');
    }
  }

  async getDataPinnedRepository(username) {
    try {
      const response = await fetch(
        `https://pinned.berrysauce.me/get/${username}`,
      );
      const data = await response.json();

      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        if (item.name && username) {
          await this.getDataReadmeRepository(
            username,
            item.name,
            'main',
            index,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getDataReadmeRepository(owner, repo, branch, index) {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`,
      );
      const data = await response.text();
      const sanitizedData = DOMPurify.sanitize(marked.parse(data));
      if (this.bodyRepository[index]) {
        this.bodyRepository[index].innerHTML = sanitizedData;
        return sanitizedData;
      }
      return console.error('Elemento não encontrado para o índice:', index);
    } catch (error) {
      console.error(
        '[Catch] problema no índice:',
        index,
        '[Api Error]:',
        error,
      );
    }
  }

  searchLiGuide() {
    let olELement = document.querySelector('ol');
    if (olELement) {
      let liElements = olELement.querySelectorAll('li');

      for (let i = 0; i < liElements.length; i++) {
        let liElement = liElements[i];

        // Verifique se este <li> contém um elemento <ul>
        let pElement = liElement.querySelector('p');

        // Se este <li> contém um <ul>, verifique se contém um <a> dentro do <ul>
        let ulElement = liElement.querySelector('ul');

        if (pElement && ulElement) {
          let li2ndElement = ulElement.querySelector('li');
          pElement.classList.add('stepStepP');
          ulElement.classList.add('stepStepUL');
          li2ndElement.classList.add('stepStepLI');
        }
      }
    }
  }

  async init() {
    const username = 'skitttz';
    if (username) {
      await Promise.allSettled([
        this.getDataPinnedRepository(username),
        this.createElements(username),
      ]);
      this.searchLiGuide();
      this.clearTopicsHyperLink();
      this.renderizeCodeTag();
      this.transformArchorToVideo(
        'https://github.com/Skitttz/Cats/assets/94083688/bcd0c656-1773-4e9c-9add-68d0176c3b36',
      );
      this.allLinksBlank('a');
    }
  }
}
