import { describe, expect, test } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import userEvent from "@testing-library/user-event";

const values = {
  name: "samar ali",
  email: "damarali@yahoo.com",
  body: "Samar Ali Add comment",
};

describe("<Form />", () => {
  test("should show name input field", () => {
    render(<Form />);
    const nameInput = screen.getByPlaceholderText("Name");
    expect(nameInput).toBeInTheDocument();
  });

  test("should show email input field", () => {
    render(<Form />);
    const emailInput = screen.getByPlaceholderText("email");
    expect(emailInput).toBeInTheDocument();
  });

  test("should change input value when typing in name input", () => {
    render(<Form />);
    const nameInput = screen.getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: values.name } });
    expect(nameInput.value).toBe(values.name);
  });

  test('should display "Add Comment" button', () => {
    render(<Form />);
    const addButton = screen.getByRole("button", { name: "Add Comment" });
    expect(addButton).toBeInTheDocument();
  });

  test('should submit the form when "Add Comment" button is clicked', () => {
    render(<Form />);
    const addButton = screen.getByRole("button", { name: "Add Comment" });
    userEvent.click(addButton);
    // Add your assertions here for form submission behavior
  });

  test("should display success message after form submission", () => {
    render(<Form />);
    const addButton = screen.getByRole("button", { name: "Add Comment" });
    userEvent.click(addButton);
    // Add your assertions here for success message display
  });
});
