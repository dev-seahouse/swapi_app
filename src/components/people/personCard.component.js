import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

export const PersonCard = ({ name, birthYear, fileIdx, id }) => {
  let history = useHistory();
  let match = useRouteMatch();
  const handleClick = (id) => history.push(`${match.path}/${id}`);
  return (
    <div
      className="gallery-item has-pointer"
      onClick={handleClick.bind(null, id)}
    >
      <div className="card">
        <div className="card-header">
          <span className="text-sm">
            <em>FILE #{fileIdx}</em>
          </span>
        </div>
        <div className="card-content text-center">
          <h3 className="text-no-wrap file-text">{name}</h3>
          <h4 className="file-subtitle file-text">{birthYear}</h4>
        </div>
        <div className="card-footer text-center">
          <p className="link">Open File</p>
        </div>
      </div>
    </div>
  );
};
