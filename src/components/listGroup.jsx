import React from "react";

const ListGroup = (props) => {
  const {
    genres,
    selectedGenre,
    textProperity,
    valueProperity,
    onGenreSelect,
  } = props;

  return (
    <ul className="list-group">
      {genres.map((g) => (
        <li
          className={
            g === selectedGenre
              ? "list-group-item clickable active"
              : "list-group-item clickable"
          }
          key={g[valueProperity]}
          onClick={() => onGenreSelect(g)}
        >
          {g[textProperity]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperity: "name",
  valueProperity: "_id",
};

export default ListGroup;
