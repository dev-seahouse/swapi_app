import './peopleList.styles.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllPeople,
  selectAllPeople,
} from '../../redux/people/peopleSlice';

export const PeopleList = () => {
  const allPeople = useSelector(selectAllPeople);
  const peopleStatus = useSelector((state) => state.people.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (peopleStatus === 'idle') {
      dispatch(fetchAllPeople());
    }
  }, [peopleStatus, dispatch]);

  const PersonCard = ({ name, birthYear, fileIdx }) => (
    <div className="gallery-item">
      <div className="card">
        <div className="card-header">
          <span>{fileIdx}</span>
        </div>
        <div className="card-content">
          <h3>{name}</h3>
          <h4>{birthYear}</h4>
        </div>
        <div className="card-footer">
          <a href="">Open File</a>
        </div>
      </div>
    </div>
  );

  let peopleList = (<div className="flex flex-h-center full-width">
    <h1 className="text-center">Loading....</h1>
  </div>);

  if (peopleStatus === 'succeeded') {
    peopleList = (
      <div className="gallery">
        {allPeople.map((person, i) => (
          <PersonCard
            fileIdx={i}
            name={person.name}
            key={person.url}
            birthYear={person.birth_year}
          />
        ))}
      </div>
    );
  }
  return <div className="gallery">{peopleList}</div>;
};
