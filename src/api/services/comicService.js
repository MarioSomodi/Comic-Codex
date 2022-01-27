import Comic from '../../models/comic';
import {marvelApi, getApiAuthString} from '../apiConfig';

const formatResultToComic = result => {
  var textObj = result.textObjects.find(x => x.type === 'issue_solicit_text');
  var description =
    textObj === undefined
      ? 'There was no description provided for this Comic.'
      : textObj.text;
  var priceObj = result.prices.find(x => x.type === 'printPrice');
  var printPrice =
    priceObj === undefined
      ? 'There was no price provided for this Comic.'
      : priceObj.price;
  var thumbnailUrl =
    result.thumbnail.path.includes('image_not_available') ||
    result.thumbnail.path.includes('4c002e0305708')
      ? true
      : result.thumbnail.path.replace('http', 'https') +
        '/portrait_incredible.' +
        result.thumbnail.extension;
  var currentComic = new Comic(
    result.id,
    result.characters.available,
    result.creators.available,
    result.title,
    description,
    result.events.available,
    thumbnailUrl,
    result.issueNumber,
    result.pageCount,
    printPrice,
    result.series.name,
    result.stories.available,
  );
  return currentComic;
};

const getComicsFromApi = async (limit, offset, searchValue) => {
  var comics = [];
  if (limit === null) limit = 99;
  var paramsObj = {
    limit: limit,
    formatType: 'comic',
    orderBy: '-modified',
    offset: offset,
  };
  if (searchValue != null && searchValue.trim().length > 0) {
    paramsObj.titleStartsWith = searchValue;
  }
  var authString = await getApiAuthString();
  const response = await marvelApi.get('comics' + authString, {
    params: paramsObj,
  });
  if (response.data.data.count == 0) {
    comics.push('false');
    return comics;
  }
  response.data.data.results.forEach(result => {
    comics.push(formatResultToComic(result));
  });
  return comics;
};

export {getComicsFromApi};
