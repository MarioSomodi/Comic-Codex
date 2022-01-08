import {marvelApi, getApiAuthString} from '../api/apiConfig';
import Comic from '../models/comic';

const formatResultToComic = result => {
  var textObj = result.textObjects.find(x => x.type === 'issue_solicit_text');
  var description =
    textObj === undefined
      ? 'There was no description provided for this comic.'
      : textObj.text;
  var priceObj = result.prices.find(x => x.type === 'printPrice');
  var printPrice =
    priceObj === undefined
      ? 'There was no price provided for this comic.'
      : priceObj.price;
  var thumbnailUrl =
    result.thumbnail.path + '/detail.' + result.thumbnail.extension;
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

const getComics = async limit => {
  var comics = [];
  if (limit === null) limit = 24;
  var authString = await getApiAuthString();
  const response = await marvelApi.get('comics' + authString, {
    params: {limit: limit, format: 'comic', formatType: 'comic'},
  });
  response.data.data.results.forEach(result => {
    comics.push(formatResultToComic(result));
  });
  return comics;
};

export {getComics};
