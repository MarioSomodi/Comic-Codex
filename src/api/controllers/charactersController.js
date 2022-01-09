import {getCharactersFromApi} from '../services/charactersService';

const GetCharacters = async (limit, offset) => {
  return await getCharactersFromApi(limit, offset);
};

export {GetCharacters};
