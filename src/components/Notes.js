import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNote,
  delNote,
  toggleImportanceOf,
  addHashtag,
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
  const [liveNote, setLiveNote] = useState('');
  const [list, setList] = useState(true);
  const [updateMode, setUpdateMode] = useState(true);
  const dispatch = useDispatch();

  let importance = useSelector((state) => state.filter);

  console.log(importance);

  const notes = useSelector((state) =>
    state.search === ''
      ? state.notes
      : state.notes.filter((note) =>
          note.content
            .toString()
            .toLowerCase()
            .includes(state.search.toLowerCase())
        )
  );

  let filteredNotes = null;
  if (importance === 'ALL') {
    filteredNotes = notes;
  } else if (importance === 'IMPORTANT') {
    filteredNotes = notes.filter((note) => note.important);
  } else if (importance === 'NONIMPORTANT') {
    filteredNotes = notes.filter((note) => !note.important);
  }

  const updateNoted = (event) => {
    event.preventDefault();
    notes.map((notes) => (notes.id === note ? note : notes));
    const newContent = event.target.note.value;

    dispatch(updateNote(note, newContent));
    dispatch(createNotification(`${note.title} was updated`, 3000));
  };

  const handleAddHashTag = (event) => {
    event.preventDefault();
    var hashtag = event.target.hashtag.value;
    console.log(notes.map((notes) => (notes.id === note ? note : notes)));

    dispatch(addHashtag(note, hashtag));
  };

  const toBeOpenedOrUpdated = () => (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => [setIsOpen(false), setLiveNote('')]}
    >
      {updateMode ? (
        <div>
          <div>
            <form onSubmit={handleAddHashTag}>
              <input name="hashtag" placeholder="hashtag..." />
              <button type="submit">+</button>
            </form>
          </div>
          <form onSubmit={updateNoted}>
            <div>
              <h4 className={noteStyles.updateModalTitle}>{note.title}</h4>
              <TextareaAutosize
                className={noteStyles.createInput}
                name="note"
                defaultValue={note.content}
                autoFocus
                onChange={(e) => setLiveNote(e.target.value)}
              />
            </div>

            <button className={noteStyles.updateSubmitButton} type="submit">
              update
            </button>
            <button
              className={noteStyles.updateSubmitButton}
              onClick={() => setUpdateMode(!updateMode)}
            >
              View mode
            </button>
          </form>
          <div className={noteStyles.borderAroundLive}>
            <ReactMarkdown
              className={noteStyles.liveText}
              source={liveNote}
            ></ReactMarkdown>
          </div>
          <p>Hashtags: {note.hashtags}</p>
        </div>
      ) : (
        <div>
          <button
            className={noteStyles.updateSubmitButton}
            onClick={() => setUpdateMode(!updateMode)}
          >
            Update Mode
          </button>
          <ReactMarkdown
            className={noteStyles.liveText}
            source={note.content}
          ></ReactMarkdown>
        </div>
      )}
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
      <div className={noteStyles.changeView}>
        <i
          class={list ? 'far fa-square' : 'fas fa-list'}
          onClick={() => setList(!list)}
        ></i>
      </div>

      <ul className={list ? noteStyles.tilesOfNotes : noteStyles.listOfNotes}>
        {filteredNotes.map((note) => (
          <li
            className={list ? noteStyles.noteTile : noteStyles.noteList}
            key={note.id}
          >
            <div className={noteStyles.content}>
              <h3
                className={
                  note.important ? noteStyles.titleImportant : noteStyles.title
                }
              >
                {note.title}
              </h3>
              {isOpen ? toBeOpenedOrUpdated() : ''}
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
