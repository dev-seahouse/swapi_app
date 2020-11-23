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
      otherPromises.push(peopleReq({ page: i }));
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

export const getPersonDetails = async (pObj) => {
  const { homeworld, species, films, vehicles, starships } = pObj;

  try {
    const responses = [homeworld, species, films, vehicles, starships].map(
      (entry) => {
        if (hasNothingToFetch(entry)) return null;
        if (isString(entry)) {
          return makeRequest(entry)();
        }
        if (Array.isArray(entry)) {
          return entry.map((item) => makeRequest(item)());
        }
        return entry;
      }
    );

    const processedReqs = responses.map(async (r) => {
      if (Array.isArray(r)) {
        const res = await Promise.all(r);
        return await Promise.all(res.map((d) => d.json()));
      }
      //Promise.resolve must return the exact object passed in if and only if it is a promise
      if (Promise.resolve(r) === r) {
        return r.then((data) => data.json());
      }
      return r;
    });

    const resolved = await Promise.all(processedReqs);

    return {
      ...pObj,
      homeworld: resolved[0],
      species: resolved[1],
      films: resolved[2],
      vehicles: resolved[3],
      starships: resolved[4],
    };
  } catch (e) {
    return Promise.reject(e.message ? e.message : {});
  }
};

export const getPeopleByPage = async (pageNum = 1) => {
  const resPromise = await fetch(`${SWAPI_URL}/people/?page=${pageNum}`);
  return await resPromise.json();
};
