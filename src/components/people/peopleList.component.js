import './peopleList.styles.scss'
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectAllPeople} from "../../redux/people/peopleSlice";

export const People = () =>{
  const allPeople = useSelector(selectAllPeople);
  const peopleStatus = useSelector(state=>state.people)
  useEffect(()=>{
    console.log(allPeople)
  })
  return (<div>
      <h1>People List</h1>
  </div>)
}
