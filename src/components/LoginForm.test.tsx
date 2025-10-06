import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const handleSubmit = vi.fn()
const setUsername = vi.fn(value => username = value)
const setPassword = vi.fn(value => password = value)
let username = ""
let password = ""

const mockProps = {
    handleSubmit: handleSubmit,
    setUsername: setUsername,
    setPassword: setPassword,
    username: username,
    password: password
}

describe('Testing LoginForm component', () => {
    beforeEach(() => {
        render(<LoginForm {...mockProps}/>)
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })
    it('Updates the username and password properly', async () => {
        const user = userEvent.setup()

        const username = screen.getByTestId('username-input')
        const password = screen.getByTestId('password-input')
        const loginBtn = screen.getByTestId('login-submit')

        await user.type(username, 'testuser')
        await user.type(password, 'password123')

        await user.click(loginBtn)

        expect(handleSubmit).toHaveBeenCalledTimes(1)

        expect(setUsername).toHaveBeenCalledTimes(8)
        expect(setPassword).toHaveBeenCalledTimes(11)
    })
})