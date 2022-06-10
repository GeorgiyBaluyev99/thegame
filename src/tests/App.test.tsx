import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from '../App';

describe('Start game button', () => {
  test('renders start button', () => {
    render(<App />);
    const button = screen.getByText(/start/i);
    expect(button).toBeInTheDocument();
  });

  test('changes the button text', () => {
    render(<App />);
    let button = screen.getByText(/start/i);
    act(() => button.click())
    button = screen.getByText(/stop/i);
    expect(button).toBeInTheDocument();
  });
})
