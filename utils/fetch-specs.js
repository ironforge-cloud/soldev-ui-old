import { fetchContent } from './fetch-github';

export const fetchSpecsDir = async () => {
  const directories = [];

  await fetchContent('solana-foundation', 'specs', '/')
    .then(res => res.json())
    .then(response => {
      for (let item of response) {
        if (item.type === 'dir') {
          directories.push({
            title: item.name,
            path: item.path,
            links: item._links
          });
        }
      }
    });
  return directories;
};

export const fetchSpecsModules = async () => {
  const modules = [];
  const directories = await fetchSpecsDir();
  for (let directory of directories) {
    await fetchContent('solana-foundation', 'specs', directory.path);
    await fetch(`https://api.github.com/repos/solana-foundation/specs/contents/${directory.path}`)
      .then(response => response.json())
      .then(response => {
        const files = [];
        for (let item of response) {
          if (item.type === 'file') {
            files.push({
              title: item.name,
              path: item.path,
              download_url: item.download_url,
              links: item._links
            });
          }
        }
        modules.push({
          directory: directory.title,
          files: files
        });
      });
  }
  return modules;
};

export const fetchGitHubFile = async url => {
  return await fetch(url, {
    headers: {
      authorization: `TOKEN ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    }
  }).then(res => res.text());
};
