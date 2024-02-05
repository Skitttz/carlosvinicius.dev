import { marked } from 'marked';
import * as DOMPurify from 'dompurify';

export default class RepositoryGit {
  constructor(bodyRepository) {
    this.bodyRepository = document.querySelectorAll(bodyRepository);
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

  async getDataPinnedRepository(username) {
    try {
      const response = await fetch(
        `https://pinned.berrysauce.me/get/${username}`,
      );
      const data = await response.json();

      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        if (item.name && username) {
          const readmeData = await this.getDataReadmeRepository(
            username,
            item.name,
            'main',
            index,
          );
          console.log(readmeData);
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
      this.bodyRepository[index].innerHTML = sanitizedData;
      return sanitizedData;
    } catch (error) {
      console.error(error);
    }
  }

  async init() {
    const username = 'skitttz';
    if (username) {
      await this.getDataPinnedRepository(username);
    }
  }
}
