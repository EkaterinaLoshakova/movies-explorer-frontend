import {BEAT_FILMS_URL, SHORT_MOVIE} from "./constants";

export function addSaved(beatMovies, savedMovies) {
  return beatMovies.map((movie) => {
    const savedMovie = savedMovies.find(savedMovie => savedMovie.movieId === movie.id)
    if (savedMovie) {
      return {...movie, saved: true, savedMovieId: savedMovie['_id']}
    } else {
      return {...movie, saved: false}
    }
  })
}

export function filterMovies(pattern, isShort, beatMovies) {
  return beatMovies.filter((movie) => {
    const data = movie.nameRU.toLowerCase().includes(pattern.toLowerCase())
    return isShort ? (movie.duration <= SHORT_MOVIE && data) : data
  })
}

export class Movie {
  constructor(movie) {
    this.country = movie.country;
    this.director = movie.director;
    this.duration = movie.duration;
    this.year = movie.year;
    this.description = movie.description;
    this.image = BEAT_FILMS_URL + movie.image.url;
    this.trailerLink = movie.trailerLink;
    this.thumbnail = BEAT_FILMS_URL + movie.image.formats.thumbnail.url;
    this.movieId = movie.id;
    this.nameRU = movie.nameRU;
    this.nameEN = movie.nameEN;
  }
}
