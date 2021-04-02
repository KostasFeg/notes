import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNote,
  delNote,
  toggleImportanceOf,
  addHashtag,
} from '../reducers/noteReducer';
import { createNotification } from '../reducers/notificationReducer';

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

  console.log(note);

  let importance = useSelector((state) => state.filter);

  console.log(importance);

  const noteModal = useSelector((state) => state.notes);
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

  const toBeOpenedOrUpdated = () => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={() => [setIsOpen(!isOpen), setLiveNote('')]}
      >
        {updateMode ? (
          <div>
            <p>Hashtags: {note.hashtags}</p>
            <button
              className="bg-indigo-300 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => [setUpdateMode(!updateMode), setLiveNote('')]}
            >
              View mode
            </button>
            <div>
              <form onSubmit={handleAddHashTag}>
                <input name="hashtag" placeholder="hashtag..." />
                <button type="submit">+</button>
              </form>
            </div>
            <h4 className="text-center font-mono text-3xl text-gray-800 ">
              {note.title}
            </h4>

            <div className="flex divide-x divide-yellow-500  ">
              <form className="w-1/2 h-screen" onSubmit={updateNoted}>
                <div>
                  <TextareaAutosize
                    className="resize border rounded-md w-full"
                    name="note"
                    defaultValue={note.content}
                    autoFocus
                    onChange={(e) => setLiveNote(e.target.value)}
                  />
                </div>

                <button
                  className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
                  type="submit"
                >
                  update
                </button>
              </form>
              {setLiveNote ? (
                <div>
                  <ReactMarkdown
                    source={liveNote}
                    plugins={[gfm]}
                    className="prose prose-sm"
                  ></ReactMarkdown>
                </div>
              ) : (
                <p>Type to see the formatted text..</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => setUpdateMode(!updateMode)}>
              Update Mode
            </button>
            <div className="prose prose-sm">
              <ReactMarkdown
                source={note.content}
                plugins={[gfm]}
                className="prose prose-sm"
              ></ReactMarkdown>
            </div>
          </div>
        )}
      </Modal>
    );
  };

  const updateNoted = (event) => {
    event.preventDefault();
    notes.map((notes) => (notes.id === note ? note : notes));
    const newContent = event.target.note.value;
    console.log(note, newContent);
    dispatch(updateNote(note, newContent));
    dispatch(createNotification(`${note.title} was updated`, 3000));
  };

  const handleAddHashTag = (event) => {
    event.preventDefault();
    var hashtag = event.target.hashtag.value;
    console.log(notes.map((notes) => (notes.id === note ? note : notes)));

    dispatch(addHashtag(note, hashtag));
  };

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
      <div>
        <i onClick={() => setList(!list)}></i>
      </div>

      <ul className="flex flex-wrap justify-items-center justify-center ">
        {filteredNotes.map((note, index) => (
          <li
            className="block rounded overflow-hidden shadow-lg h-48  w-1/3 m-1  p-1  bg-indigo-100 relative"
            key={note.id}
          >
            <div className="flex flex-col">
              <h1 className="text-center font-mono text-xl text-gray-800 ">
                {note.title}
              </h1>

              <ReactMarkdown
                source={note.content}
                plugins={[gfm]}
                className="prose prose-xs"
              ></ReactMarkdown>

              <ul className="flex flex-row absolute bottom-0 m-1">
                {note.hashtags.map((hashtag) => (
                  <li className="  bg-blue-500 hover:bg-blue-300 text-white  font-bold py-1 px-1  ">
                    {hashtag}
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-0 right-0 ">
                <button onClick={() => toBeDeleted(note)}>
                  <svg
                    class="h-5 w-5 text-indigo-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => [
                    setIsOpen(!isOpen),
                    setNote(noteModal[index]),
                  ]}
                >
                  <svg
                    class="h-5 w-5 text-indigo-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button onClick={() => changeImportance(note)}>
                  <svg
                    class="h-5 w-5 text-indigo-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isOpen ? toBeOpenedOrUpdated() : ''}
    </div>
  );
};

export default Notes;

//<Modal open={isOpen} onClose={() => setIsOpen(false)}>
//              {note.content}
//            </Modal>
