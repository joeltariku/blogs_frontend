import axios from "axios";
const baseUrl = "/api/blogs";

type BlogBody = {
  title: string;
  author: string;
  url: string;
  likes: number;
};

let token: string = "";

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async (request: BlogBody) => {
  const { title, author, url, likes } = request;
  const config = {
    headers: { Authorization: token },
  };
  const blogCreation = {
    title,
    author,
    url,
    likes,
  };
  const response = await axios.post(baseUrl, blogCreation, config);
  console.log(response.data)
  return response.data;
};

const edit = async (request: BlogBody, id: string) => {
  const { title, author, url, likes } = request;
  const config = {
    headers: { Authorization: token },
  };
  const editedBlog = {
    title,
    author,
    url,
    likes,
  };

  const response = await axios.put(`${baseUrl}/${id}`, editedBlog, config);
  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export default { setToken, getAll, create, edit, remove };
