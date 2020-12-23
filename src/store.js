import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

console.log(reducer);

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
