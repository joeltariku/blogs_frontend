import type { Blog as BlogType } from "../types/Blog";

type BlogProps = {
  blog: BlogType;
};

const Blog = ({ blog }: BlogProps) => (
  <div>
    {blog.title} {blog.author}
  </div>
);

export default Blog;
