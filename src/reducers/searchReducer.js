const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.search;
    default:
      return state;
  }
};

export const searchChange = (search) => {
  return {
    type: 'SET_SEARCH',
    search: search,

  };
};


export default searchReducer;
