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
    case 'DELETE':
      return state.filter((note) => note.id !== action.data);
    case 'TOGGLE_IMPORTANCE':
      const idImportance = action.data;
      console.log(idImportance);
      const noteToChange = state.find((n) => n.id === idImportance);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) =>
        note.id !== idImportance ? note : changedNote
      );

    default:
      return state;
  }
};

export const createNote = (note, title) => {
  return async (dispatch) => {
    const newNote = await noteService.create(note, title);
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

export const delNote = (note) => {
  return async (dispatch) => {
    const noteToBeDeleted = await noteService.deletion(note);
    dispatch({
      type: 'DELETE',
      data: note.id,
    });
  };
};

export const toggleImportanceOf = (note) => {
  return async (dispatch) => {
    const notToChangeImportance = await noteService.changeImportance(note);

    dispatch({ type: 'TOGGLE_IMPORTANCE', data: note.id });
  };
};

export default noteReducer;
