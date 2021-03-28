import React from 'react';
import { searchChange } from '../reducers/searchReducer';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import filterStyles from '../styles/filterStyles.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(searchChange(event.target.value));
  };

  return (
    <div>
      <div className={filterStyles.headerAndSearch}>
        <h3 className={filterStyles.header}>NOTES</h3>
        <input className={filterStyles.searchField} onChange={handleChange} />
      </div>
      <div className={filterStyles.radio}>
        all
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('ALL'))}
        />
        important
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('IMPORTANT'))}
        />
        nonimportant
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange('NONIMPORTANT'))}
        />
      </div>
    </div>
  );
};

export default Filter;
