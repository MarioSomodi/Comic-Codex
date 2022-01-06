import {marvelApi, getApiAuthString} from '../api/apiConfig';
import Comic from '../models/comic';

const formatResultToComic = result => {
  var description = result.textObjects.find(
    x => x.type === 'issue_solicit_text',
  ).text;
  var printPrice = result.prices.find(x => x.type === 'printPrice').price;
  var thumbnailUrl =
    result.thumbnail.path +
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

const getComics = async limit => {
  var comics = [];
  if (limit == null) limit = 10;
  var authString = await getApiAuthString();
  const response = await marvelApi.get('comics' + authString, {
    params: {limit: limit, format: 'comic', formatType: 'comic'},
  });
  response.data.data.results.forEach(result => {
    comics.push(formatResultToComic(result));
  });
  console.log(comics.length);
  return comics;
};

export {getComics};
