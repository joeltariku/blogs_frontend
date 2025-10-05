import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'
import {describe, it, expect, beforeEach, afterEach } from 'vitest'
import type { Blog as BlogType } from '../types/Blog'
import { vi } from 'vitest'
import BlogList from './BlogList'

const handleLogout = vi.fn()
const updateBlogs = vi.fn()

const mockBlogs: BlogType[] = [
    {
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
    },
    {
        url: "https://amazon.com",
        title: "medium wave brush",
        author: "360Jeezy",
        likes: 192,
        id: 'test-blog-id2',
        user: {
            username: 'test456',
            name: '360Jeezy',
            id: 'test-user-id2'
        }
    }
]

const mockProps = {
    name: "Joel Tariku",
    blogs: mockBlogs,
    handleLogout: handleLogout,
    updateBlogs: updateBlogs
}

describe('Testing BlogList component', () => {
    beforeEach(() => {
        window.localStorage.setItem(
            'loggedInUser',
            JSON.stringify({ username: 'test123', name: 'Joel Tariku', id: 'test-user-id'})
        )
        render(<BlogList {...mockProps}/>)
    })
    afterEach(() => {
        vi.restoreAllMocks()
    }) 
    it('shows all blogs', () => {
        const blogItems = screen.getAllByTestId('blog-item')
        expect(blogItems).toHaveLength(mockBlogs.length)
    })
    it('clicking the logout button calls the logout handler', async () => {
        const user = userEvent.setup()
        const logoutBtn = screen.getAllByTestId('logout-button')
        await user.click(logoutBtn[0])

        expect(handleLogout).toHaveBeenCalledTimes(1)
    })
})