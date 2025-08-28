import { useState } from "react";
import type { Blog as BlogType } from "../types/Blog";
import blogService from "../services/blogs";

type BlogProps = {
  blog: BlogType;
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

const Blog = ({ blog }: BlogProps) => {
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [likes, setLikes] = useState(blog.likes)

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
          <button onClick={toggleView}>hide</button>
        ) : (
          <button onClick={toggleView}>view</button>
        )}
      </div>
      {showDetailedView && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {likes} <button onClick={addLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {/* because first blog was created without user */}
          <button onClick={removeBlog}>remove blog</button>
        </>
      )}
    </div>
  );
};

export default Blog;
