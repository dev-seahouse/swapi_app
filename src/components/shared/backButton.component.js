import React from "react";
import { useHistory } from "react-router-dom";

export const BackButton = ({ parentUrl, btnText, classNames }) => {
  const history = useHistory();
  return (
    <button
      className={`btn btn-primary ${classNames}`}
      onClick={() => history.push(parentUrl)}
    >
      {btnText}
    </button>
  );
};
