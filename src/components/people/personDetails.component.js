import {
  fetchAllPeople,
  fetchPersonById,
  selectPerson,
  selectPersonDetailsStatus,
} from "../../redux/people/peopleSlice";

import TopSecretStamp from "../../assets/images/topsecret.png";

import "./person.styles.scss";

import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackButton } from "../shared/backbutton.component";

export const Person = ({ personId }) => {
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

  const profileContent = (person) => (
    <div className="doc-box-content-col">
      <h3 className="doc-box-content-title">Profile</h3>
      <div className="doc-box-content-row">
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name">Name:</p>
          <p className="doc-box-content-field-val">{person.name}</p>
        </div>
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name text-no-wrap">Birth Year:</p>
          <p className="doc-box-content-field-val">{person.birth_year}</p>
        </div>
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name">Gender:</p>
          <p className="doc-box-content-field-val">{person.gender}</p>
        </div>
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name">Height:</p>
          <p className="doc-box-content-field-val">{person.height}</p>
        </div>
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name">Mass:</p>
          <p className="doc-box-content-field-val">{person.mass}</p>
        </div>
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name">Skin Color:</p>
          <p className="doc-box-content-field-val">{person.skin_color}</p>
        </div>
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name">Eye Color:</p>
          <p className="doc-box-content-field-val">{person.eye_color}</p>
        </div>
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name">Species:</p>
          <p className="doc-box-content-field-val">
            {person.species
              ? person.species.map((s) => s.name).join(",")
              : "unknown"}
          </p>
        </div>
        <div className="doc-box-content-row-col">
          <p className="doc-box-content-field-name">Home:</p>
          <p className="doc-box-content-field-val">
            {person.homeworld ? person.homeworld.name : "unknown"}
          </p>
        </div>
      </div>
    </div>
  );

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
            {profileContent(person)}
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
      <BackButton />
      {content}
    </section>
  );
};
