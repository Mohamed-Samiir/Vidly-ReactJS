import React, { Component } from "react";
import * as MoviesAPI from "../mockData/fakeMovieService";

class Movies extends Component {
  state = {
    movies: MoviesAPI.getMovies(),
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    MoviesAPI.deleteMovie(movie._id);
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <h2>There is no movies in stock</h2>;
    else
      return (
        <div>
          <div>
            <h2>Number Of Movies In Stock: {count}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Stock</th>
                  <th>Rate</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(movie)}
                        className="btn btn-danger button-small"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
  }
}

export default Movies;
