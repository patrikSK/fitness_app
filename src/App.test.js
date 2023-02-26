import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

// test block
test("name of the test", () => {
  // 1. rendering the component we want to test
  render(<App />);

  // 2. finding the element
  const ahojElement = screen.getByText(/ahoj/i);

  // 3. assertion
  expect(ahojElement).toBeInTheDocument();
});
