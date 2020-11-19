import './peopleList.styles.scss'
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAllPeople, selectAllPeople} from "../../redux/people/peopleSlice";

export const People = () => {
  const allPeople = useSelector(selectAllPeople);
  const peopleStatus = useSelector(state=>state.people.status)
  const dispatch = useDispatch()

  useEffect(()=>{
      if (peopleStatus === 'idle') {
        dispatch(fetchAllPeople())
      }
  }, [peopleStatus, dispatch])

  let peopleList = '<p>Loading....</p>'
  if (peopleStatus === "succeeded") {
    peopleList = (<ul>
      {allPeople.map(person=> (<li key={person.url}>{person.name}</li>))}
    </ul>)
  }
  console.log(peopleStatus)
  return (<div>
    {peopleList}
  </div>)
}
