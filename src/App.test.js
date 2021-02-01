import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";

test('renders HeaderBar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Filter Products/i);
  expect(linkElement).toBeInTheDocument();
});


