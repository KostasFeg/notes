import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNote,
  delNote,
  toggleImportanceOf,
} from '../reducers/noteReducer';
import { createNotification } from '../reducers/notificationReducer';
import noteStyles from '../styles/noteStyles.module.css';
import { useState } from 'react';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import TextareaAutosize from 'react-textarea-autosize';

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
    dispatch(createNotification(`${note.title} was updated`, 3000));
  };

  console.log(notes);

  const toBeUpdated = () => (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <form onSubmit={updateNoted}>
        <div>
          <h4 className={noteStyles.updateModalTitle}>{note.title}</h4>
          <TextareaAutosize
            className={noteStyles.textArea}
            name="note"
            defaultValue={note.content}
            autoFocus
          />
        </div>
        <button className={noteStyles.updateSubmitButton} type="submit">
          update
        </button>
      </form>
    </Modal>
  );

  const toBeDeleted = (note) => {
    const r = window.confirm(`You want to delete ${note.title}?`);
    if (r) {
      dispatch(delNote(note));
    }
    console.log(note.id);
  };

  const changeImportance = (note) => {
    dispatch(toggleImportanceOf(note));
    console.log(note);
  };

  return (
    <div>
      {isOpen ? toBeUpdated() : ''}
      <ul className={noteStyles.listOfNotes}>
        {notes.map((note) => (
          <li className={noteStyles.note} key={note.id}>
            <div className={noteStyles.content}>
              <h3
                className={
                  note.important ? noteStyles.titleImportant : noteStyles.title
                }
              >
                {note.title}
              </h3>
              <h5>{note.important ? 'important' : 'not important'}</h5>
              <ReactMarkdown
                className={noteStyles.markdown}
                source={note.content}
                plugins={[gfm]}
              ></ReactMarkdown>
              <div className={noteStyles.notesIcons}>
                <i
                  className="fas fa-trash-alt"
                  onClick={() => toBeDeleted(note)}
                ></i>
                <i
                  className="fas fa-pen"
                  onClick={() => [setIsOpen(!isOpen), setNote(note)]}
                ></i>
                <i
                  className="fas fa-star"
                  onClick={() => changeImportance(note)}
                ></i>
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
