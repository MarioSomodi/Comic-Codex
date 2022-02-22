import {
  getCreatorsFromApi,
  getCreatorsComicsFromApi,
  getCreatorFromApi,
} from '../services/creatorService';

const GetCreators = async (limit, offset, searchValue) => {
  return await getCreatorsFromApi(limit, offset, searchValue);
};

const GetCreator = async id => {
  return await getCreatorFromApi(id);
};

const GetCreatorsComics = async (limit, offset, id) => {
  return await getCreatorsComicsFromApi(limit, offset, id);
};

export {GetCreators, GetCreatorsComics, GetCreator};
