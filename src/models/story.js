export default class Story {
  constructor(
    id,
    title,
    description,
    type,
    creators,
    charactersAvailable,
    seriesAvailable,
    comicsAvailable,
    eventsAvailable,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.creators = creators;
    this.charactersAvailable = charactersAvailable;
    this.seriesAvailable = seriesAvailable;
    this.comicsAvailable = comicsAvailable;
    this.eventsAvailable = eventsAvailable;
  }
}
