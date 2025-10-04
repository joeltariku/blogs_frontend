import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import {describe, it, expect, beforeEach } from 'vitest'
import Blog from './Blog'
import type { Blog as BlogType } from '../types/Blog'
import { vi } from 'vitest'
import blogService from '../services/blogs'

vi.mock('../services/blogs', () => ({
    default: {
        edit: vi.fn().mockResolvedValue(undefined)
    }
}))

const mockBlog: BlogType = {
    url: "https://youtuble.com",
    title: "Test blog",
    author: "Joel Tariku",
    likes: 1,
    id: "test-blog-id",
    user: {
        username: "test123",
        name: "Joel Tariku",
        id: "test-user-id"
    }
}

describe('Testing Blog component', () => {
    beforeEach(() => {
        render(<Blog blog={mockBlog} updateBlogs={() => {}}/>)
    })
    it('only blog title and author is initially displayed', () => {
        const intro = screen.getByText('Test blog by Joel Tariku')
        const url = screen.queryByTestId('blog-url');
        const likes = screen.queryByTestId('likes');
        expect(intro).toBeInTheDocument();
        expect(url).not.toBeInTheDocument();
        expect(likes).not.toBeInTheDocument();
    })
    it('after clicking the button, extra info is displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getAllByTestId('view-button')
        await user.click(button[0])

        const url = screen.getByTestId('blog-url')
        const likes = screen.getByTestId('likes')
        const username = screen.getByTestId('username')
        expect(url).toBeInTheDocument()
        expect(likes).toBeInTheDocument()
        expect(username).toBeInTheDocument()
    })
    it('after adding two likes, blogService.edit is called twice', async () => {
        const user = userEvent.setup()
        const button = screen.getAllByTestId('view-button')
        await user.click(button[0])

        const likeBtn = screen.getAllByTestId('like-button')
        await user.click(likeBtn[0])
        await user.click(likeBtn[0])

        expect(blogService.edit).toHaveBeenCalledTimes(2)
    })
})