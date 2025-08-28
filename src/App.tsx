import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";

import type { Blog as BlogType } from "./types/Blog";
import BlogList from "./components/BlogList";
import type { LoginData } from "./types/Auth";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import axios from "axios";
import Togglable from "./components/Togglable";
import type { TogglableRef } from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import type { LoginUser } from "./types/LoginUser";

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [user, setUser] = useState<LoginUser | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const blogFormRef = useRef<TogglableRef>(null);
  const loginFormRef = useRef(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const login = window.localStorage.getItem("loggedInUser");
    if (login) {
      const UserData = JSON.parse(login);
      setUser(UserData);
      blogService.setToken(UserData.token);
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
      blogService.setToken(login.token);
      setMessage("Logged in succesfully");
    } catch (error) {
      setIsError(true);
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
        setIsError(false);
      }, 5000);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.clear();
    setMessage("Logged out successfully");
  };

  const handleToggle = () => {
    blogFormRef.current?.toggleVisibility();
  };

  if (user === null) {
    return (
      <>
        <Notification isError={isError} message={message} />
        <Togglable ref={loginFormRef} buttonLabel="login">
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
      </>
    );
  }

  return (
    <div>
      <Notification isError={isError} message={message} />
      <BlogList handleLogout={handleLogout} name={user.name} blogs={blogs} />
      <Togglable ref={blogFormRef} buttonLabel="create new blog">
        <CreateBlog
          handleToggle={handleToggle}
          setIsError={setIsError}
          setMessage={setMessage}
        />
      </Togglable>
    </div>
  );
};

export default App;
