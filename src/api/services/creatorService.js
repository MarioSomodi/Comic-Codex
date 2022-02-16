import Creator from '../../models/creator';
import {marvelApi, getApiAuthString} from '../apiConfig';

const formatResultToCreator = result => {
  var currentCreator = new Creator(
    result.id,
    result.fullName,
    null,
    result.comics.available,
    result.series.available,
    result.stories.available,
    result.events.available,
  );
  return currentCreator;
};

const getCreatorsFromApi = async (limit, offset, searchValue) => {
  var creators = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    orderBy: '-modified',
    offset: offset,
  };
  if (searchValue != null && searchValue.trim().length > 0) {
    paramsObj.nameStartsWith = searchValue;
  }
  var authString = await getApiAuthString();
  const response = await marvelApi.get('creators' + authString, {
    params: paramsObj,
  });
  if (response.data.data.count === 0) {
    creators.push('false');
    return creators;
  }
  response.data.data.results.forEach(result => {
    creators.push(formatResultToCreator(result));
  });
  return creators;
};

export {getCreatorsFromApi};
