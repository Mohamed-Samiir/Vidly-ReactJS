import React, { Component } from "react";
import Form from "./form";
import { getMovie, saveMovie, getMovies } from "../mockData/fakeMovieService";
import { getGenres } from "../mockData/fakeGenreService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
  };

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });

    if (this.props.match.params.id === "new") return;

    const movie = getMovie(this.props.match.params.id);

    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToMovieModel(movie) });
  };

  mapToMovieModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.createInput("title", "Title")}
          {this.createSelect("genreId", "Genre", this.state.genres)}
          {this.createInput("numberInStock", "Number In Stock")}
          {this.createInput("dailyRentalRate", "Daily Rental Rate")}
          {this.createButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
