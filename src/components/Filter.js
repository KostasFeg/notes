import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import '../styles/Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(filterChange(event.target.value));
  };

  return (
    <div className="headerAndSearch">
      <h3 className="header">NOTES</h3>
      <input className="searchField" onChange={handleChange} />
    </div>
  );
};

export default Filter;
