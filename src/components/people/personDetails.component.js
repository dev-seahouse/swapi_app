import {
  fetchAllPeople,
  fetchPersonById,
  selectPerson,
  selectPersonDetailsStatus,
} from "../../redux/people/peopleSlice";

import TopSecretStamp from "../../assets/images/topsecret.png";
import { Profile } from "./personDetails.profile.component";
import "./person.styles.scss";

import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "../shared/backButton.component";

export const PersonDetails = ({ personId, parentUrl }) => {
  const peopleStatus = useSelector((state) => state.people.status);
  const person = useSelector((state) => selectPerson(state, personId));
  const dispatch = useDispatch();
  const personDetailsStatus = useSelector((state) =>
    selectPersonDetailsStatus(state, personId)
  );

  const fetchAllPeopleIfNotExist = useCallback(
    (peopleStatus) => {
      if (peopleStatus === "idle") {
        dispatch(fetchAllPeople());
      }
    },
    [dispatch]
  );

  // handles user directly visits /people:personId
  useEffect(() => {
    fetchAllPeopleIfNotExist(peopleStatus);
  }, [peopleStatus, fetchAllPeopleIfNotExist]);

  useEffect(() => {
    if (peopleStatus === "succeeded" && personDetailsStatus === "idle") {
      dispatch(fetchPersonById(personId));
    }
  }, [personId, peopleStatus, personDetailsStatus, dispatch]);

  const starshipsContent = (starships) => (
    <div className="doc-box-content-col">
      <h3 className="doc-box-content-title">Starships</h3>
      <ul className="doc-box-content-row">
        {starships
          ? starships.map((s) => <li key={s.name}>{s.name}</li>)
          : "No ships"}
      </ul>
    </div>
  );

  const vehiclesContent = (vehicles) => (
    <div className="doc-box-content-col">
      <h3 className="doc-box-content-title">Vehicles</h3>
      <ul className="doc-box-content-row">
        {vehicles
          ? vehicles.map((v) => <li key={v.name}>{v.name}</li>)
          : "No Vehicles"}
      </ul>
    </div>
  );

  const moviesContent = (movies) => (
    <div className="doc-box-content-col">
      <h3 className="doc-box-content-title">Movies</h3>
      <ul className="doc-box-content-row">
        {movies
          ? movies.map((m) => <li key={m.title}>{m.title}</li>)
          : "No Movies"}
      </ul>
    </div>
  );

  let content = <h1 className="text-center">Loading</h1>;

  if (peopleStatus === "succeeded" && personDetailsStatus === "succeeded") {
    content = (
      <div className="doc-box">
        <div className="doc-box-id-container">
          <span className="doc-box-id">FILE #{person.id}</span>
        </div>
        <div className="doc-box-header">
          <div className="dox-box-secret-img-container">
            <img
              className="doc-box-secret-img"
              src={TopSecretStamp}
              alt="top secret stamp"
            />
          </div>
          <div className="doc-box-header-content">
            <h1 className="doc-box-title">CLASSIFIED INFORMATION</h1>
            <h2 className="doc-box-subtitle">for authorized personnel only</h2>
          </div>
        </div>
        <div className="doc-box-content">
          <div className="doc-box-main-content">
            {Profile(person)}
            {starshipsContent(person.starships)}
            {vehiclesContent(person.vehicles)}
          </div>
          <div className="doc-box-main-content">
            {moviesContent(person.films)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <section className="section">
      <BackButton
        parentUrl={parentUrl}
        btnText="Back To List"
        classNames="no-h-margin"
      />
      {content}
    </section>
  );
};
