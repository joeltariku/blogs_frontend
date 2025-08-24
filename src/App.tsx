import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import type { Blog as BlogType } from './types/Blog'
import BlogList from './components/BlogList'
import type { LoginData } from './types/Auth'

const App = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const loginObject: LoginData = {
      username,
      password
    }

    try {
      const login = await loginService.login(loginObject)
      setUser(login)
    } catch (error) {
      console.log(error)
      setUser(null)
    }
  }

  if (user === null) {
    return (
         <div>
      <h2>Log in to view blogs</h2>
      <form onSubmit={handleLogin}>
        <div>
        <label>
          username
          <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
        </label>
        </div>
        <div>
        <label>
          password
          <input type="text" value={password} onChange={event => setPassword(event.target.value)} />
        </label>
        </div>
        <input type="submit" value="Login"/>
      </form>
    </div>
    )
  }

  return (
    <div>
      <BlogList name={user.name} blogs={blogs} />
    </div>
  )
}

export default App