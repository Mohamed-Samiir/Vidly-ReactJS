import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/movies";

function movieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndPoint);
}

export function getMovie(id) {
  return http.get(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  const body = { ...movie };
  delete body._id;
  return http.post(apiEndPoint, movie);
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id));
}
