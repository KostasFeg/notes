import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import filterStyles from '../styles/filterStyles.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(filterChange(event.target.value));
  };

  return (
    <div className={filterStyles.headerAndSearch}>
      <h3 className={filterStyles.header}>NOTES</h3>
      <input className={filterStyles.searchField} onChange={handleChange} />
    </div>
  );
};

export default Filter;
