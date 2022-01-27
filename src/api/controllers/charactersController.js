import {getCharactersFromApi} from '../services/charactersService';

const GetCharacters = async (limit, offset, searchValue) => {
  return await getCharactersFromApi(limit, offset, searchValue);
};

export {GetCharacters};
