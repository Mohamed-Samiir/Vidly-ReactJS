import React, { Component } from "react";

const Input = ({ label, id, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input {...rest} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
