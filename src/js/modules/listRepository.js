import * as DOMPurify from 'dompurify';
import { marked } from 'marked';
import { generateDefaultColor } from './generateDefaultColor';

export default class RepositoryGit {
  constructor(bodyRepository) {
    this.bodyRepository = document.querySelectorAll(bodyRepository);
    this.slideContainer = document.querySelector('.slide');
    this.controlsContainer = document.querySelector('.controls');
    this.numberLimitRepo = 4;
  }

  renderizeCodeTag() {
    const codeElements = document.querySelectorAll('code');
    for (const codeElement of codeElements) {
      const liElement = codeElement.parentElement;
      liElement.classList.add('liDoCode');
    }
  }

  clearTopicsHyperLink() {
    const divElements = document.querySelectorAll('.body-repository');
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
      for (const divElement of divElements) {
        const defaultColor = generateDefaultColor();
        // Seleciona todos os hiperlinks dentro da div
        if (divElement) {
          const pElement = divElement.querySelector('p');
          pElement?.classList.add('containerTopic');
        }
        const links = divElement.querySelectorAll('a');

        // Itera sobre os hiperlinks
        for (const linkElement of links) {
          for (const key in objectTopicsHref) {
            if (
              objectTopicsHref[key].href === linkElement.getAttribute('href')
            ) {
              const topicElement = document.createElement('span');
              topicElement.textContent = linkElement.textContent;
              linkElement.parentNode.replaceChild(topicElement, linkElement);
              topicElement.classList.add('titleTopic');
              topicElement.style.backgroundColor = defaultColor;
            }
          }
        }
      }
    }
  }

  generateMarginDetails() {
    const divElements = document.querySelectorAll('.body-repository');

    for (const divElement of divElements) {
      const details = divElement.querySelectorAll('details');

      for (const detailsElement of details) {
        detailsElement.classList.add('details-margin');
      }
    }
  }

  transformArchorToVideo(src) {
    const linkElement = document.querySelector(`a[href="${src}"]`);
    if (linkElement) {
      const videoURL = linkElement.href;
      const videoElement = document.createElement('video');
      videoElement.src = videoURL;
      videoElement.controls = true;
      videoElement.style.width = '100%';
      videoElement.style.height = '100%';
      linkElement.parentNode.replaceChild(videoElement, linkElement);
    } else {
      console.error('Elemento <a> não encontrado.');
    }
  }

  allLinksBlank(tagName) {
    const links = document.querySelectorAll(tagName);
    for (const link of links) {
      if (link.href) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    }
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
        `https://pinned.berrysauce.dev/get/${username}`,
      );
      const data = await response.json();
      for (let index = 0; index < this.numberLimitRepo; index++) {
        const listControls = document.createElement('li');
        const imageControls = document.createElement('img');
        listControls.appendChild(imageControls);
        //Criar Li
        const listItem = document.createElement('li');
        listItem.className = 'content-body-repository';
        //Criar Div
        const divElement = document.createElement('div');
        divElement.className = 'body-repository';

        //Colocar div dentro do Li
        listItem.appendChild(divElement);

        //Colocar Li dentro do UL slide
        this.slideContainer.appendChild(listItem);
        this.controlsContainer.appendChild(listControls);
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
        `https://pinned.berrysauce.dev/get/${username}`,
      );
      const data = await response.json();
      for (let index = 0; index < this.numberLimitRepo; index++) {
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
    const olELement = document.querySelector('ol');
    if (olELement) {
      const liElements = olELement.querySelectorAll('li');
      for (let i = 0; i < liElements.length; i++) {
        const liElement = liElements[i];

        // Verifique se este <li> contém um elemento <ul>
        const pElement = liElement.querySelector('p');

        // Se este <li> contém um <ul>, verifique se contém um <a> dentro do <ul>
        const ulElement = liElement.querySelector('ul');

        if (pElement && ulElement) {
          const li2ndElement = ulElement.querySelector('li');
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
      this.generateMarginDetails();
      this.renderizeCodeTag();
      this.transformArchorToVideo(
        'https://github.com/Skitttz/Cats/assets/94083688/bcd0c656-1773-4e9c-9add-68d0176c3b36',
      );
      this.allLinksBlank('a');
    }
  }
}
