import React from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import { createNotification } from '../reducers/notificationReducer';

const NoteCreate = () => {
  const dispatch = useDispatch();
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));
    dispatch(createNotification(content, 10000));
  };
  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">create</button>
    </form>
  );
};

export default NoteCreate;
