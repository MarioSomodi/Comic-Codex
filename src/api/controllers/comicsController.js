import {getComicsFromApi} from '../services/comicService';

const GetComics = async (limit, offset, searchValue) => {
  return await getComicsFromApi(limit, offset, searchValue);
};

export {GetComics};
