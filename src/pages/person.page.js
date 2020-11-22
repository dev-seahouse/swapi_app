import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPeople,
  fetchPersonById,
  selectPerson,
  selectPersonDetailsStatus,
} from "../redux/people/peopleSlice";

const Person = ({ personId }) => {
  const peopleStatus = useSelector((state) => state.people.status);
  const person = useSelector((state) => selectPerson(state, personId));
  const dispatch = useDispatch();
  const personDetailsStatus = useSelector((state) =>
    selectPersonDetailsStatus(state, personId)
  );

  const fetchAllPeopleIfNotExist = (peopleStatus) => {
    if (peopleStatus === "idle") {
      dispatch(fetchAllPeople());
    }
  };

  useEffect(() => {
    fetchAllPeopleIfNotExist(peopleStatus);
  }, [peopleStatus]);

  useEffect(() => {
    if (peopleStatus === "succeeded" && personDetailsStatus === "idle") {
      dispatch(fetchPersonById(personId));
    }
  }, [personId, peopleStatus, personDetailsStatus]);

  let content = (
    <div className="flex flex-h-center full-width">
      <h1 className="text-center">Loading</h1>
    </div>
  );

  if (peopleStatus === "succeeded" && personDetailsStatus === "succeeded") {
    content = <div></div>;
  }
  return content;
};

export const PersonPage = () => {
  let { personId } = useParams();
  return <Person personId={personId} />;
};
