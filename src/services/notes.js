import axios from 'axios';
const baseUrl = ' http://localhost:3001/notes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response);
  return response.data;
};

const create = async (content) => {
  const noteToCreate = { content, important: false };
  const response = await axios.post(baseUrl, noteToCreate);
  return response.data;
};

const update = async (note) => {
  const response = await axios.put(`${baseUrl}/${note.id}`, note);
  return response.data;
};

export default { getAll, update, create };
