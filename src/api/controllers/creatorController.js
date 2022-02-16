import {getCreatorsFromApi} from '../services/creatorService';

const GetCreators = async (limit, offset, searchValue) => {
  return await getCreatorsFromApi(limit, offset, searchValue);
};

export {GetCreators};
