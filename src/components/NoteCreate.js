import React, { useState } from 'react';
import '../styles/NoteCreate.css';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import { createNotification } from '../reducers/notificationReducer';
import Modal from 'react-modal';

const NoteCreate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    const title = event.target.title.value;
    event.target.title.value = '';
    dispatch(createNote(content, title));
    dispatch(createNotification(content, 10000));
  };
  return (
    <div className="createButtonDiv">
      <button className="createButton" onClick={() => setIsOpen(true)}>
        Create
      </button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <form onSubmit={addNote}>
          <input
            className="createInput"
            name="title"
            placeholder="Title"
            required="true"
          />
          <input
            className="createInput"
            name="note"
            placeholder="Content"
            required="true"
          />
          <button className="createSubmitBtn" type="submit">
            create
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default NoteCreate;
