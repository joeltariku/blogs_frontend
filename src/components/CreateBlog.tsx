import { useState, type Dispatch, type SetStateAction } from "react";
import blogService from "../services/blogs";
import axios from "axios";
import type { Blog } from "../types/Blog";

type CreateBlogProps = {
  setMessage: Dispatch<SetStateAction<string>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  handleToggle: () => void;
  updateBlogs: (blog: Blog) => void
};

const CreateBlog = ({
  setMessage,
  setIsError,
  handleToggle,
  updateBlogs
}: CreateBlogProps) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleToggle();
    const blog = {
      title,
      author,
      url,
      likes,
    };

    try {
      const createdBlog = await blogService.create(blog);
      updateBlogs(createdBlog)
      setMessage(`a new blog "${blog.title}" by ${blog.author} added`);
    } catch (error) {
      setIsError(true);
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage("An unknown error occurred");
      }
      console.log(error);
    } finally {
      setTitle("");
      setAuthor("");
      setUrl("");
      setLikes(0);
      setTimeout(() => {
        setMessage("");
        setIsError(false);
      }, 5000);
    }
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            likes
            <input
              type="number"
              value={likes}
              onChange={(event) => setLikes(Number(event.target.value))}
            />
          </label>
        </div>
        <input type="submit" value="Create" id="create-blog-button"/>
      </form>
    </>
  );
};

export default CreateBlog;
