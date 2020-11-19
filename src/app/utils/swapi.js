import { SWAPI_URL } from '../../config';

export const getAllPeople = async () => {
  try {
    const firstRes = await fetch(`${SWAPI_URL}/people/`);
    const firstJson = await firstRes.json();

    if (!firstRes.ok) {
      throw new Error(firstRes.statusText);
    }

    const numPagesToFetch = Math.ceil(firstJson.count / 10);

    const otherPromises = [];

    for (let i = 2; i <= numPagesToFetch; i++) {
      otherPromises.push(fetch(`${SWAPI_URL}/people/?page=${i}`));
    }
    const otherRes = await Promise.all(otherPromises);

    const otherJsons = await Promise.all(otherRes.map((r) => r.json()));

    if (!otherRes.ok) {
      throw new Error(firstRes.statusText);
    }

    const combinedResults = otherJsons.reduce(
      (acc, curr) => acc.concat(curr.results),
      []
    );
    return firstJson.results.concat(combinedResults);
  } catch (err) {
    return Promise.reject(err.message ? err.message : []);
  }
};

export const getPeopleByPage = async (pageNum = 1) => {
  const resPromise = await fetch(`${SWAPI_URL}/people/?page=${pageNum}`);
  const resJson = await resPromise.json();
  return resJson;
};
