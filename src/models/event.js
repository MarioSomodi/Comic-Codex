export default class Event {
  constructor(
    id,
    title,
    description,
    start,
    end,
    thumbnail,
    creators,
    charactersAvailable,
    storiesAvailable,
    comicsAvailable,
    seriesAvailable,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.start = start;
    this.end = end;
    this.thumbnail = thumbnail;
    this.creators = creators;
    this.charactersAvailable = charactersAvailable;
    this.storiesAvailable = storiesAvailable;
    this.comicsAvailable = comicsAvailable;
    this.seriesAvailable = seriesAvailable;
  }
}
