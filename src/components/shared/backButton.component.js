import React from "react";
import { useHistory } from "react-router-dom";

export const BackButton = ({ parentUrl, btnText }) => {
  const history = useHistory();
  return (
    <button className="btn btn-primary" onClick={() => history.push(parentUrl)}>
      {btnText}
    </button>
  );
};
