export default class Series {
  constructor(
    id,
    title,
    description,
    startYear,
    endYear,
    rating,
    type,
    thumbnail,
    creators,
    charactersAvailable,
    storiesAvailable,
    comicsAvailable,
    eventsAvailable,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startYear = startYear;
    this.endYear = endYear;
    this.rating = rating;
    this.type = type;
    this.thumbnail = thumbnail;
    this.creators = creators;
    this.charactersAvailable = charactersAvailable;
    this.storiesAvailable = storiesAvailable;
    this.comicsAvailable = comicsAvailable;
    this.eventsAvailable = eventsAvailable;
  }
}
