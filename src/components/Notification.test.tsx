import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Notification from "./Notification";

describe('Testing Notification component', () => {
    it('renders nothing when the message is empty', () => {
        const { container } = render(<Notification message="" isError={false} />)

        expect(container).toBeEmptyDOMElement()
    })
    it('renders error message with error class when isError is true', () => {
        render(<Notification message="Something went wrong" isError={true} />)
        const message = screen.getByText('Something went wrong');

        expect(message).toBeInTheDocument()
        expect(message).toHaveClass('error')
    })
    it('renders success message with success class when isError is false', () => {
        render(<Notification message="Operation is successful" isError={false}/>)
        const message = screen.getByText('Operation is successful')

        expect(message).toBeInTheDocument()
        expect(message).toHaveClass('success')
    })
})