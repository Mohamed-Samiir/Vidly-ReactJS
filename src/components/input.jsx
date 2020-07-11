import React, { Component } from "react";

const Input = ({ name, label, id, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        name={name}
        id={id}
        value={value}
        type="text"
        onChange={onChange}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
