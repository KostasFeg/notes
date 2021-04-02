import React from 'react';
import { searchChange } from '../reducers/searchReducer';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    dispatch(searchChange(event.target.value));
  };

  return (
    <div>
      <div className="flex flex-col content-center justify-center">
        <h3 className="text-center font-mono text-3xl text-gray-800 m-5 ">
          NOTES
        </h3>
        <input
          className=" self-center shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          placeholder="Search"
        />
      </div>
      <div class="flex flex-col items-center justify-center ">
        <div className="text-center flex flex-col">
          <label className="inline-flex items-center mt-1">
            <input
              type="radio"
              name="filter"
              onChange={() => dispatch(filterChange('ALL'))}
            />
            <span class="ml-2 text-gray-700">all</span>
          </label>
          <label className="inline-flex items-center mt-1">
            <input
              type="radio"
              name="filter"
              onChange={() => dispatch(filterChange('IMPORTANT'))}
            />
            <span class="ml-2 text-gray-700">important</span>
          </label>
          <label className="inline-flex items-center mt-1">
            <input
              type="radio"
              name="filter"
              onChange={() => dispatch(filterChange('NONIMPORTANT'))}
            />
            <span class="ml-2 text-gray-700">non-important</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
