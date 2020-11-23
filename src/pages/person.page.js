import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { PersonDetails } from "../components/people/personDetails.component";

export const PersonPage = (props) => {
  let { personId } = useParams();

  const hasInvalidParam = (param) => !personId || isNaN(personId);
  return hasInvalidParam(personId) ? (
    <Redirect to="/" />
  ) : (
    <PersonDetails personId={personId} parentUrl={"/people"} />
  );
};
