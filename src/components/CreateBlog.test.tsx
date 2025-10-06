import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import CreateBlog from "./CreateBlog";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";

vi.mock('../services/blogs', () => ({
    default: {
        create: vi.fn()
    }
}))

const setMessage = vi.fn()
const setIsError = vi.fn()
const handleToggle = vi.fn()
const updateBlogs = vi.fn()

const mockProps = {
    setMessage: setMessage,
    setIsError: setIsError,
    handleToggle: handleToggle,
    updateBlogs: updateBlogs
}

describe('Testing CreateBlog component', () => {
    beforeEach(() => {
        vi.useRealTimers()
        render(<CreateBlog {...mockProps}/>)
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })
    it('sumbits, calls create service, updates list, shows message, and clears fields on success', async () => {
        const user = userEvent.setup()

        const createdBlog = {
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
        };
    
        (blogService.create as Mock).mockResolvedValue(createdBlog)

        const titleInput = screen.getByTestId('title-input')
        const authorInput = screen.getByTestId('author-input')
        const urlInput = screen.getByTestId('url-input')
        const likesInput = screen.getByTestId('likes-input')
        const createBtn = screen.getByTestId('create-blog-button')

        await user.type(titleInput, 'Test blog')
        await user.type(authorInput, 'Joel Tariku')
        await user.type(urlInput, 'https://youtube.com')
        await user.type(likesInput, '1')

        await user.click(createBtn)

        expect(handleToggle).toHaveBeenCalledTimes(1)

        expect(blogService.create).toHaveBeenCalledTimes(1)
        expect(blogService.create).toHaveBeenCalledWith({
            title: 'Test blog',
            author: 'Joel Tariku',
            url: 'https://youtube.com',
            likes: 1
        })

        expect(updateBlogs).toHaveBeenCalledTimes(1)
        expect(updateBlogs).toHaveBeenCalledWith(createdBlog)

        expect(setMessage).toHaveBeenCalledWith('a new blog "Test blog" by Joel Tariku added')

        expect(titleInput).toHaveValue("");
        expect(authorInput).toHaveValue("");
        expect(urlInput).toHaveValue("");
        expect(likesInput).toHaveValue(0);

        await waitFor(() => {
            expect(setIsError).toHaveBeenCalledWith(false)
            expect(setMessage).toHaveBeenCalledWith("");
        }, { timeout: 3000})
    })
    it('handles an axios error properly', async () => {
        const user = userEvent.setup()

        const error = {
            isAxiosError: true,
            response: {
                data: {
                    error: "Mock error message"
                }
            }
        };

        (blogService.create as Mock).mockRejectedValueOnce(error)

        const titleInput = screen.getByTestId('title-input')
        const authorInput = screen.getByTestId('author-input')
        const urlInput = screen.getByTestId('url-input')
        const likesInput = screen.getByTestId('likes-input')
        const createBtn = screen.getByTestId('create-blog-button')

        await user.type(titleInput, 'Test blog')
        await user.type(authorInput, 'Joel Tariku')
        await user.type(urlInput, 'https://youtube.com')
        await user.type(likesInput, '1')

        await user.click(createBtn)

        expect(setMessage).toHaveBeenCalledWith("Mock error message")

        expect(titleInput).toHaveValue("");
        expect(authorInput).toHaveValue("");
        expect(urlInput).toHaveValue("");
        expect(likesInput).toHaveValue(0);

        await waitFor(() => {
            expect(setIsError).toHaveBeenCalledWith(false)
            expect(setMessage).toHaveBeenCalledWith("");
        }, { timeout: 3000})
    })
    it('handles non axios error properly', async () => {
        const user = userEvent.setup();

        (blogService.create as Mock).mockRejectedValueOnce(new Error())

        const titleInput = screen.getByTestId('title-input')
        const authorInput = screen.getByTestId('author-input')
        const urlInput = screen.getByTestId('url-input')
        const likesInput = screen.getByTestId('likes-input')
        const createBtn = screen.getByTestId('create-blog-button')

        await user.type(titleInput, 'Test blog')
        await user.type(authorInput, 'Joel Tariku')
        await user.type(urlInput, 'https://youtube.com')
        await user.type(likesInput, '1')

        await user.click(createBtn)

        expect(setMessage).toHaveBeenCalledWith("An unknown error occurred")
        expect(titleInput).toHaveValue("");
        expect(authorInput).toHaveValue("");
        expect(urlInput).toHaveValue("");
        expect(likesInput).toHaveValue(0);

        await waitFor(() => {
            expect(setIsError).toHaveBeenCalledWith(false)
            expect(setMessage).toHaveBeenCalledWith("");
        }, { timeout: 3000})
    })
})