import { useState } from "react";
import type { Blog as BlogType } from "../types/Blog";
import blogService from "../services/blogs";

type BlogProps = {
  blog: BlogType;
  updateBlogs: (blog: BlogType) => void;
};

// const Blog = ({ blog }: BlogProps) => (
//   <>
//     <Togglable buttonLabel="view" text={`${blog.title} by ${blog.author}`}>
//       <div>
//         <div>{blog.url}</div>
//         <div>likes {blog.likes}</div>
//         <div>added by {blog.user?.name}</div>
//       </div>
//     </Togglable>
//   </>
// );

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const Blog = ({ blog, updateBlogs }: BlogProps) => {
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [likes, setLikes] = useState(blog.likes)

  const login = window.localStorage.getItem("loggedInUser");
  const userData = JSON.parse(login!);

  console.log('username: ', userData.username)
  console.log('blog user: ', blog.user.username)
  

  const toggleView = () => {
    setShowDetailedView(!showDetailedView);
  };

  const addLike = async () => {
    const id = blog.id;
    const blogContent = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
    };

    try {
      await blogService.edit(blogContent, id);
      setLikes(likes + 1)
      console.log("added like to blog!");
    } catch (error) {
      console.log(error);
    }
  };

  const removeBlog = async () => {
    const id = blog.id;

    try {
      if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
        await blogService.remove(id);
        updateBlogs(blog)
        console.log('blog deleted succesfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {`${blog.title} by ${blog.author} `}
        {showDetailedView ? (
          <button onClick={toggleView} data-testid="hide-button">hide</button>
        ) : (
          <button onClick={toggleView} data-testid="view-button">view</button>
        )}
      </div>
      {showDetailedView && (
        <>
          <div data-testid="blog-url">{blog.url}</div>
          <div data-testid="likes">
            likes {likes} <button onClick={addLike} data-testid="like-button">like</button>
          </div>
          <div data-testid="username">{blog.user?.name}</div>
          {/* because first blog was created without user */}
          {(userData.username === blog.user.username) && <button onClick={removeBlog}>remove blog</button>}
        </>
      )}
    </div>
  );
};

export default Blog;
