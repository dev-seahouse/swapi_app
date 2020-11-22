import { SWAPI_URL } from "../config";

const isArrayEmpty = (entity) => Array.isArray(entity) && !entity.length;
const isString = (str) => typeof str === "string";
const hasNothingToFetch = (entity) => !entity || isArrayEmpty(entity);

const makeRequest = (root, path) => {
  let url = (path && `${root}${path}/`) || `${root}`;
  return (paramObj) => {
    if (paramObj) {
      let newUrl = url;
      const queryString = Object.entries(paramObj).map(
        ([key, val]) => `${key}=${val}`
      );
      newUrl += `?${queryString}`;
      return fetch(newUrl);
    }
    return fetch(url);
  };
};

const peopleReq = makeRequest(SWAPI_URL, "people");
export const getAllPeople = async () => {
  try {
    const firstRes = await peopleReq();
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
  return await resPromise.json();
};
