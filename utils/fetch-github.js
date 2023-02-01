// Fetches data from a repository
export const fetchContent = async (owner, repo, path) => {
  return await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      authorization: `TOKEN ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    }
  });
};

// fetch raw file data(currently text only)
export const fetchRaw = async (url) => {
    return await fetch(url).then((res) => res.text());
};

// fetch all pull requests
export const fetchPulls = async (owner, repo) => {
    const pullRequests =  await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
            headers: {
                authorization: `TOKEN ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
        }
    ).then(res => res.json())
        .then(response =>
            response.map(
                ({id, html_url, number, title, user: {html_url: userHtmlUrl}}) => ({
                    id, // pull request id
                    html_url, // github url
                    number, // pull request number, use to fetch PR files
                    title, // pull request title
                    userHtmlUrl, // user github url
                })
            ));

  const requestPromises = pullRequests.map(({ number }) =>
      fetchPullFiles(number)
  );

  const download_url = await Promise.all(requestPromises);

  pullRequests.forEach((pullRequest, index) => {
    pullRequest.download_url = download_url[index];
  });

  return pullRequests;
};

// fetch pull request files
export const fetchPullFiles = async (pullNumber) => {
    return await fetch(
        `https://api.github.com/repos/solana-foundation/solana-improvement-documents/pulls/${pullNumber}/files`,
        {
            headers: {
                authorization: `TOKEN ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
            },
        }
    )
        .then((res) => res.json())
        .then((data) => data.map(({ raw_url }) => raw_url));
};
