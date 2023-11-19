import axios from "axios";
import { date } from "yup";
axios.defaults.withCredentials = true;

const fetchRequest = async (url) => {
  try {
    const res = await axios.get(url, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    return error;
  }
};

const postRequest = async (url, body) => {
  try {
    const res = await axios.post(url, body, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteRequest = async (url, id) => {
  try {
    const res = await axios.delete(`${url}/${id}`, { withCredentials: true });
    const data = await res.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

const updateRequest = async (url, id, body) => {
  try {
    const res = await axios.patch(`${url}/${id}`, body, {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export { fetchRequest, postRequest, deleteRequest, updateRequest };
