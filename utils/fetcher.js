import fetch from 'isomorphic-unfetch';

// eslint-disable-next-line
export default async function Fetcher(...args) {
  try {
    const res = await fetch(...args);
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
