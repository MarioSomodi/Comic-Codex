import {getComicsFromApi} from '../services/comicService';

const GetComics = async (limit, offset) => {
  return await getComicsFromApi(limit, offset);
};

export {GetComics};
