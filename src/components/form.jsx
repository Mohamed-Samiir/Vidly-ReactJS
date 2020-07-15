import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperity = ({ name, value }) => {
    const properity = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(properity, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperity(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  createInput = (name, label, type = "text") => {
    return (
      <Input
        name={name}
        id={name}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
      />
    );
  };

  createSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        id={name}
        value={this.state.data[name]}
        error={this.state.errors[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
      />
    );
  };

  createButton = (label) => {
    return (
      <button className="btn btn-primary btn-sm" disabled={this.validate()}>
        {label}
      </button>
    );
  };
}

export default Form;
