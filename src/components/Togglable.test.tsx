import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Togglable from "./Togglable";
import userEvent from "@testing-library/user-event";

const Child = () => <div>secret content</div>

describe('Testing Togglable component', () => {
    it('renders the show button and hides content initially', async () => {
        // const user = userEvent.setup()
        render(<Togglable buttonLabel="view"><Child /></Togglable>)

        const viewToggle = screen.getByTestId('view-toggle-content')
        expect(viewToggle).toBeInTheDocument()

        const childContainer = screen.getByText('secret content').parentElement;
        expect(childContainer).toHaveStyle({ display: "none" })
    })
    it("shows children when button is clicked", async () => {
        const user = userEvent.setup();

        render(<Togglable buttonLabel="show"><Child /></Togglable>);

        const button = screen.getByTestId("view-toggle-content");
        await user.click(button);

        const childContainer = screen.getByText("secret content").parentElement;
        expect(childContainer).toHaveStyle({ display: "block" });
    });
})