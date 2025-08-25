import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";

import type { Blog as BlogType } from "./types/Blog";
import BlogList from "./components/BlogList";
import type { LoginData } from "./types/Auth";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const login = window.localStorage.getItem("loggedInUser");
    if (login) {
      const UserData = JSON.parse(login)
      setUser(UserData);
      blogService.setToken(UserData.token)
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginObject: LoginData = {
      username,
      password,
    };

    try {
      const login = await loginService.login(loginObject);
      setUser(login);
      window.localStorage.setItem("loggedInUser", JSON.stringify(login));
      blogService.setToken(login.token)
      setMessage("Logged in succesfully")
    } catch (error) {
        setIsError(true)
        if (axios.isAxiosError(error) && error.response) {
          setMessage(error.response.data.error);
        } else {
          setMessage("An unknown error occurred");
        }
      console.log(error);
      setUser(null);
    } finally {
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setMessage("");
        setIsError(false)
      }, 5000)
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.clear();
    setMessage("Logged out successfully")
  };

  if (user === null) {
    return (
      <div>
        <Notification isError={isError} message={message}/>
        <h2>Log in to view blogs</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification isError={isError} message={message} />
      <BlogList handleLogout={handleLogout} name={user.name} blogs={blogs} />
      <CreateBlog setIsError={setIsError} setMessage={setMessage}/>
    </div>
  );
};

export default App;
