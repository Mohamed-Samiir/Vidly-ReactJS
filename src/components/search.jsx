import React, { Component } from "react";

const Search = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default Search;
