import {
  fetchAllPeople,
  fetchPersonById,
  selectPerson,
  selectPersonDetailsStatus,
} from "../../redux/people/peopleSlice";

import TopSecretStamp from "../../assets/images/topsecret.png";
import { Profile } from "./personDetails.profile.component";
import { ContentCol } from "./personDetails.contentCol.component";
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

  function mapObjArrToList(arr, name, emptyMsg) {
    return arr ? arr.map((a) => <li key={a[name]}>{a[name]}</li>) : emptyMsg;
  }

  // handles user directly visits /people:personId
  useEffect(() => {
    fetchAllPeopleIfNotExist(peopleStatus);
  }, [peopleStatus, fetchAllPeopleIfNotExist]);

  useEffect(() => {
    if (peopleStatus === "succeeded" && personDetailsStatus === "idle") {
      dispatch(fetchPersonById(personId));
    }
  }, [personId, peopleStatus, personDetailsStatus, dispatch]);

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
            {
              <ContentCol
                title={"Starships"}
                objArr={person.starships}
                objKey="name"
                emptyMsg={"No Starships"}
              />
            }
            {
              <ContentCol
                title="Vehicles"
                objArr={person.vehicles}
                objKey="name"
                emptyMsg="No Vehicles"
              />
            }
          </div>
          <div className="doc-box-main-content">
            {
              <ContentCol
                title={"Movies"}
                objArr={person.movies}
                objKey={"title"}
                emptyMsg={"No Movies"}
              />
            }
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
