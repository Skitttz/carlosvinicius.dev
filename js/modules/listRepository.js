import { marked } from 'marked';
import * as DOMPurify from 'dompurify';

export default class RepositoryGit {
  constructor(bodyRepository) {
    this.bodyRepository = document.querySelectorAll(bodyRepository);
    this.slideContainer = document.querySelector('.slide');
  }

  allLinksBlank(tagName) {
    const domParser = new DOMParser();
    const document = domParser.parseFromString(html, `text/html`);
    const serializer = new XMLSerializer();
    let links = document.querySelectorAll(tagName);
    links.forEach((link) => {
      if (link.href) {
        if (isExternalUrl(link.href)) {
          link.target = `_blank`;
          link.rel = `noopener noreferrer`;
        }
      }
    });
    return serializer.serializeToString(document);
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
        // Create the <li> element
        var listItem = document.createElement('li');
        listItem.className = 'content-body-repository';

        // Create the <div> element within the <li>
        var divElement = document.createElement('div');
        divElement.className = 'body-repository';

        // Append the <div> to the <li>
        listItem.appendChild(divElement);

        // Append the <li> to the slideContainer
        this.slideContainer.appendChild(listItem);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.bodyRepository = document.querySelectorAll('.body-repository');
      this.allLinksBlank('a');
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
      } else {
        console.error('Elemento não encontrado para o índice:', index);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async init() {
    const username = 'skitttz';
    if (username) {
      await Promise.allSettled([
        this.getDataPinnedRepository(username),
        this.createElements(username),
      ]);
    }
  }
}
