import React, { useState } from 'react';
import noteCreateStyles from '../styles/noteCreateStyles.module.css';
import { useDispatch } from 'react-redux';
import { createNote } from '../reducers/noteReducer';
import { createNotification } from '../reducers/notificationReducer';
import Modal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';

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
    dispatch(createNotification(`${content} was created`, 2000));
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };
  return (
    <div className={noteCreateStyles.createButtonDiv}>
      <button
        className={noteCreateStyles.createButton}
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <form onSubmit={addNote}>
          <input
            className={noteCreateStyles.createInput}
            name="title"
            placeholder="Title"
            required="true"
          />
          <TextareaAutosize
            className={noteCreateStyles.createInput}
            name="note"
            placeholder="Content"
            required="true"
          />
          <button className={noteCreateStyles.createSubmitBtn} type="submit">
            create
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default NoteCreate;
