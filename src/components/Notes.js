import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../reducers/noteReducer';
import '../styles/Notes.css';
import { useState } from 'react';
import Modal from './Modal.js';

const Notes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  const notes = useSelector((state) =>
    state.filter === ''
      ? state.notes.sort((a, b) => b.votes - a.votes)
      : state.notes
          .sort((a, b) => b.votes - a.votes)
          .filter((anecdote) =>
            anecdote.content
              .toString()
              .toLowerCase()
              .includes(state.filter.toLowerCase())
          )
  );

  const updateNoted = (event) => {
    event.preventDefault();
    notes.map((notes) => (notes.id === note ? note : notes));
    const newContent = event.target.note.value;
    event.target.note.value = '';
    dispatch(updateNote(note, newContent));
  };

  console.log(notes);

  const toBeUpdated = () => (
    <form onSubmit={updateNoted}>
      <div>
        <input name="note" />
      </div>
      <button type="submit">create</button>
    </form>
  );

  return (
    <div>
      {isOpen ? toBeUpdated() : ''}
      <ul>
        {notes.map((note) => (
          <li className="note" key={note.id}>
            {note.content}
            <button onClick={() => [setIsOpen(!isOpen), setNote(note)]}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;

//<Modal open={isOpen} onClose={() => setIsOpen(false)}>
//              {note.content}
//            </Modal>
