import React, { useState } from 'react';
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
    <div className="text-center m-4">
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        onClick={() => setIsOpen(true)}
      >
        Create
      </button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <form onSubmit={addNote}>
          <input
            className="text-center"
            name="title"
            placeholder="Title"
            required="true"
          />
          <TextareaAutosize name="note" placeholder="Content" required="true" />
          <button type="submit">create</button>
        </form>
      </Modal>
    </div>
  );
};

export default NoteCreate;
