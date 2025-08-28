import type { Blog as BlogType } from "../types/Blog";
import Blog from "./Blog";

type BlogListProps = {
  name: string;
  blogs: BlogType[];
  handleLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const BlogList = ({ name, blogs, handleLogout }: BlogListProps) => {
  blogs.sort((a, b) => {
    return b.likes - a.likes
  })
  return (
    <>
      <h2>blogs</h2>
      <p>
        {name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
