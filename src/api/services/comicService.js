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
      : result.thumbnail.path + '/detail.' + result.thumbnail.extension;
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

const getComicsFromApi = async (limit, offset) => {
  var comics = [];
  if (limit === null) limit = 24;
  var authString = await getApiAuthString();
  const response = await marvelApi.get('comics' + authString, {
    params: {
      limit: limit,
      format: 'comic',
      formatType: 'comic',
      offset: offset,
    },
  });
  response.data.data.results.forEach(result => {
    comics.push(formatResultToComic(result));
  });
  return comics;
};

export {getComicsFromApi};
