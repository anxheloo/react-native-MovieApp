const apikey: string = '671b47eabb6f61040c310bd6f1b681fb';

export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;

export const upcomingMovie: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;

export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;

export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};

export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};

export const moviecastDetails = (id: number) => {
  return ` https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};
