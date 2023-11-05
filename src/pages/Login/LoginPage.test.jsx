import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage.jsx";

test("imputs should be initialy empty", () => {
  render(<LoginPage />, { wrapper: BrowserRouter });

  const emailInputElement = screen.getByPlaceholderText("email");
  const passwordInputElement = screen.getByPlaceholderText("password");

  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  render(<LoginPage />, { wrapper: BrowserRouter });

  const emailInputElement = screen.getByPlaceholderText("email");
  userEvent.type(emailInputElement, "adidas@gmail.com");

  expect(emailInputElement.value).toBe("adidas@gmail.com");
});

test("should be able to type an password", () => {
  render(<LoginPage />, { wrapper: BrowserRouter });

  const passwordInputElement = screen.getByPlaceholderText("password");
  userEvent.type(passwordInputElement, "heslo123");

  expect(passwordInputElement.value).toBe("heslo123");
});

test("should show email error message on invalid email", () => {
  render(<LoginPage />, { wrapper: BrowserRouter });

  let emailErrorElement = screen.queryByText(/The email is not valid/i);
  const emailInputElement = screen.getByPlaceholderText("email");
  const submitButtonElement = screen.getByRole("button", { name: /log in/i });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "adidasgmail.com");
  userEvent.click(submitButtonElement);
  emailErrorElement = screen.queryByText(/The email is not valid/i);

  expect(emailErrorElement).toBeInTheDocument();
});
