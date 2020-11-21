import './peopleList.styles.scss';
import React, { useEffect } from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
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

  const PersonCard = ({ name, birthYear, fileIdx, id }) => {
    let history = useHistory();
    let match = useRouteMatch();
    const handleClick = (id) => history.push(`${match.path}/${id}`)
    return (
    <div className="gallery-item" onClick=  {handleClick.bind(null, id)}>
      <div className="card">
        <div className="card-header">
          <span className="text-sm"><em>FILE #{fileIdx}</em></span>
        </div>
        <div className="card-content text-center">
          <h3 className="text-no-wrap file-text">{name}</h3>
          <h4 className="file-subtitle file-text">{birthYear}</h4>
        </div>
        <div className="card-footer text-center">
          <a href="" >Open File</a>
        </div>
      </div>
    </div>
  )};

  let peopleList = (<div className="flex flex-h-center full-width">
    <h1 className="text-center">Loading....</h1>
  </div>);

  if (peopleStatus === 'succeeded') {
    peopleList = (
      <div className="gallery">
        {allPeople.map((person) => (
          <PersonCard
            fileIdx={person.id}
            name={person.name}
            key={person.id}
            id = {person.id}
            birthYear={person.birth_year}
          />
        ))}
      </div>
    );
  }
  return (peopleList);
};
