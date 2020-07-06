import React, { Component } from "react";

const Like = ({ liked, OnLikeClick }) => {
  let classes = "fa fa-heart";
  if (liked) classes += "-o";
  return <i className={classes} aria-hidden="true" onClick={OnLikeClick}></i>;
};

export default Like;
