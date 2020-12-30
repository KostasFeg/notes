import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNote,
  delNote,
  toggleImportanceOf,
} from '../reducers/noteReducer';
import { createNotification } from '../reducers/notificationReducer';
import '../styles/Notes.css';
import { useState } from 'react';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';

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
    dispatch(createNotification(`${note.title} was updated`, 10000));
  };

  console.log(notes);

  const toBeUpdated = () => (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <form onSubmit={updateNoted}>
        <div>
          <h4>{note.title}</h4>
          <textarea name="note" defaultValue={note.content} />
        </div>
        <button type="submit">update</button>
      </form>
    </Modal>
  );

  const toBeDeleted = (note) => {
    dispatch(delNote(note));
    console.log(note.id);
  };

  const changeImportance = (note) => {
    dispatch(toggleImportanceOf(note));
    console.log(note);
  };

  return (
    <div>
      {isOpen ? toBeUpdated() : ''}
      <ul>
        {notes.map((note) => (
          <li className="note" key={note.id}>
            <div className="content">
              <h3>{note.title}</h3>
              <h5>{note.important ? 'important' : 'not important'}</h5>
              <ReactMarkdown>{note.content}</ReactMarkdown>
              <div>
                <button onClick={() => toBeDeleted(note)}>delete</button>
                <button onClick={() => [setIsOpen(!isOpen), setNote(note)]}>
                  update
                </button>
                <button onClick={() => changeImportance(note)}>
                  importance
                </button>
              </div>
            </div>
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
