import React from "react";
import Form from "./form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      if (this.props.match.params.id === "new") return;
      const { data: movie } = await getMovie(this.props.match.params.id);
      this.setState({ data: this.mapToMovieModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToMovieModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        console.log(this.state.data);
    }

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
