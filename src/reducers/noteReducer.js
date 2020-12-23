import noteService from '../services/notes';
const initialState = [];

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [...state, action.data];
    case 'UPDATE':
      const id = action.data.id;
      const noteVoted = state.find((note) => note.id === id);

      const updatedNote = { ...noteVoted, content: action.data.content };
      return state.map((a) => (a.id === id ? updatedNote : a));
    default:
      return state;
  }
};

export const createNote = (note) => {
  return async (dispatch) => {
    const newNote = await noteService.create(note);
    dispatch({
      type: 'CREATE',
      data: newNote,
    });
  };
};

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch({
      type: 'INIT',
      data: notes,
    });
  };
};

export const updateNote = (note, newContent) => {
  return async (dispatch) => {
    const notetoBeUpdated = { ...note, content: newContent };
    console.log(notetoBeUpdated);
    const updatedNote = await noteService.update(notetoBeUpdated);
    console.log(note);
    dispatch({
      type: 'UPDATE',
      data: updatedNote,
    });
  };
};

export default noteReducer;
