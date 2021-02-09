import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import noteReducer from './reducers/noteReducer';
import searchReducer from './reducers/searchReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  notes: noteReducer,
  search: searchReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

console.log(reducer);

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
