import Comic from '../../models/comic';
import Creator from '../../models/creator';
import {marvelApi, getApiAuthString} from '../apiConfig';
import {formatResultToCharacter} from '../services/charactersService';

const formatResultToComic = result => {
  var textObj = result.textObjects.find(x => x.type === 'issue_solicit_text');
  var description =
    textObj === undefined
      ? result.description != null
        ? result.description
        : 'There was no description provided for this Comic.'
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
    result.format,
  );
  if (result.series != null) {
    var parts = result.series.resourceURI.split('/');
    currentComic.seriesId = parts[parts.length - 1];
  }
  if (result.creators.available > 0) {
    var creatorsOfComic = [];
    result.creators.items.forEach(creator => {
      var parts = creator.resourceURI.split('/');
      var creatorObj = new Creator(
        parts[parts.length - 1],
        creator.name,
        creator.role,
      );
      creatorsOfComic.push(creatorObj);
    });
    currentComic.creators = creatorsOfComic;
  }
  return currentComic;
};

const getComicsFromApi = async (limit, offset, searchValue) => {
  var comics = [];
  if (limit === null) {
    limit = 99;
  }
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
  if (response.data.data.count === 0) {
    comics.push('false');
    return comics;
  }
  response.data.data.results.forEach(result => {
    comics.push(formatResultToComic(result));
  });
  return comics;
};

const getComicsCharactersFromApi = async (limit, offset, id) => {
  var comicsCharacters = [];
  if (limit === null) {
    limit = 99;
  }
  var paramsObj = {
    limit: limit,
    orderBy: '-modified',
    offset: offset,
  };
  var authString = await getApiAuthString();
  const response = await marvelApi.get(
    'comics/' + id + '/characters' + authString,
    {
      params: paramsObj,
    },
  );
  if (response.data.data.count === 0) {
    comicsCharacters.push('false');
    return comicsCharacters;
  }
  response.data.data.results.forEach(result => {
    comicsCharacters.push(formatResultToCharacter(result));
  });
  return comicsCharacters;
};

export {getComicsFromApi, formatResultToComic, getComicsCharactersFromApi};
