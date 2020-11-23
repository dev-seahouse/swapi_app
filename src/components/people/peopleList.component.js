import "./peopleList.styles.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPeople,
  selectAllPeople,
} from "../../redux/people/peopleSlice";
import { PersonCard } from "./personCard.component";

export const PeopleList = () => {
  const allPeople = useSelector(selectAllPeople);
  const peopleStatus = useSelector((state) => state.people.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (peopleStatus === "idle") {
      dispatch(fetchAllPeople());
    }
  }, [peopleStatus, dispatch]);

  let peopleList = (
    <div className="flex flex-h-center full-width">
      <h1 className="text-center">Loading....</h1>
    </div>
  );

  if (peopleStatus === "succeeded") {
    peopleList = (
      <div className="gallery">
        {allPeople.map((person) => (
          <PersonCard
            fileIdx={person.id}
            name={person.name}
            key={person.id}
            id={person.id}
            birthYear={person.birth_year}
          />
        ))}
      </div>
    );
  }
  return peopleList;
};
