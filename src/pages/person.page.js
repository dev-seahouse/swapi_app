import React from "react";
import { useParams } from "react-router-dom";
import { PersonDetails } from "../components/people/personDetails.component";

export const PersonPage = (props) => {
  let { personId } = useParams();

  // const hasInvalidParam = (param)=> isNaN(personId) ||
  // if ()
  return <PersonDetails personId={personId} parentUrl={"/people"} />;
};
