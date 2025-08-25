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
  return response.data;
};

export default { setToken, getAll, create };
