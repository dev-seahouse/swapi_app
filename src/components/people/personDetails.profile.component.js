import React from "react";

export const Profile = (person) => (
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
