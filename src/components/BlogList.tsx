import type { Blog as BlogType} from "../types/Blog"
import Blog from "./Blog"

type BlogListProps = {
    name: string;
    blogs: BlogType[]
}

const BlogList = ({ name, blogs }: BlogListProps) => {
    return (
        <>
        <h2>blogs</h2>
        <p>{name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        </>
    )
}

export default BlogList