export type EscapeRoomGenre =
  | "mystery"
  | "science-fiction"
  | "educational";

export type EscapeRoomExample = {
  id: string;
  title: string;
  genre: EscapeRoomGenre;
  content: string;
};

export type GenreRuleSet = {
  genre: EscapeRoomGenre;
  displayName: string;
  content: string;
};