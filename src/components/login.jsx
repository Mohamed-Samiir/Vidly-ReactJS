import React from "react";
import Form from "./form";
import Joi from "joi-browser";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // calling the server
    console.log("submitted");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.createInput("username", "Username")}
          {this.createInput("password", "Password", "password")}
          {this.createButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
