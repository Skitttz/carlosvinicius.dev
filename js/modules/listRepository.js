import { marked } from 'marked';
import * as DOMPurify from 'dompurify';

export default class RepositoryGit {
  constructor(bodyRepository) {
    this.bodyRepository = document.querySelector(bodyRepository);
  }
  getDataUserGit(username) {
    fetch(`https://api.github.com/users/${username}`, {})
      .then((response) => response.json())
      .then((data) => {
        const numRepos = data.public_repos;
        return numRepos;
      })
      .catch((error) => console.error(error));
  }

  getDataPinnedRepository(username) {
    fetch(` https://pinned.berrysauce.me/get/${username}`, {})
      .then((response) => response.json())
      .then((data) => {
        return data.map((item) =>
          this.getDataPinnedRepository(username, item.name, 'main'),
        );
      })
      .catch((error) => console.error(error));
  }

  getDataReadmeRepository(owner, repo, branch) {
    fetch(
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md
    `,
      {},
    )
      .then((response) => response.text())
      .then((data) => {
        const dataReadMe = data;
        this.bodyRepository.innerHTML = DOMPurify.sanitize(
          marked.parse(dataReadMe),
        );
      });
  }

  init() {
    const username = 'skitttz';
    if (username) {
      this.getDataUserGit(username);
      this.getDataPinnedRepository(username);
      this.getDataReadmeRepository(username, 'Nights4Films', 'main');
    }
  }
}
