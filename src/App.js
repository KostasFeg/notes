import Notes from './components/Notes';
import Filter from './components/Filter';
import NoteCreate from './components/NoteCreate';
import Notifications from './components/Notifications';
import { initializeNotes } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  console.log('hi');

  return (
    <div>
      <Notifications />
      <Filter />
      <NoteCreate />
      <Notes />
    </div>
  );
};

export default App;
