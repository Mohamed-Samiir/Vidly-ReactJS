import React, { Component } from "react";
import Form from "./form";
import Joi from "joi-browser";

class RegesterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },

    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Regester</h1>
        <form onSubmit={this.handleSubmit}>
          {this.createInput("username")}
          {this.createInput("password", "password")}
          {this.createInput("name")}
          {this.createButton("Regester")}
        </form>
      </div>
    );
  }
}

export default RegesterForm;
