import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../../app/src/components/Calculator';

describe('Calculator', () => {
  // Input Handling
  test('limits input to hexadecimal characters (0-9, A-F)', () => {
    render(<Calculator />);
    const inputDisplay = screen.getByText(/Input: 0/i);
    
    // Input valid hexadecimal characters
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('A'));
    expect(inputDisplay).toHaveTextContent('Input: 1A');
  });

  test('accepts only up to 2-digit hexadecimal numbers', () => {
    render(<Calculator />);
    const inputDisplay = screen.getByText(/Input: 0/i);
    
    // Try to input 3 digits
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('3'));
    
    expect(inputDisplay).toHaveTextContent('Input: 1F');
  });

  // Output Handling
  test('returns results as hexadecimal values only', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input A + 5
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: F');
  });

  test('limits output to a maximum of 4-digit hexadecimal values', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input FF * FF (this should give FE01, which is a valid)
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: FE01');
  });

  test('ensures results are always positive', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input 5 - A
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: 0');
  });

  // Operations
  test('performs addition of two hexadecimal numbers', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input A + 5
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: F');
  });

  test('performs subtraction ensuring no negative results', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input 5 - A
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: 0');
  });

  test('performs multiplication of two hexadecimal numbers', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input A * 5
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: 32');
  });

  test('performs division and rounds down to the nearest whole number', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input A / 3
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: 3');
  });

  test('performs chained operations (e.g., FF + AA + 13)', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input FF + AA + 13
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: 1BC');
  });

  // User Interface (UI)
  test('renders buttons for hexadecimal digits (0-9, A-F)', () => {
    render(<Calculator />);
    const hexButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    hexButtons.forEach((digit) => {
      const button = screen.getByText(digit);
      expect(button).toBeInTheDocument();
    });
  });

  test('renders buttons for basic operations (+, -, *, /)', () => {
    render(<Calculator />);
    const operationButtons = ['+', '-', '*', '/'];
    operationButtons.forEach((operation) => {
      const button = screen.getByText(operation);
      expect(button).toBeInTheDocument();
    });
  });

  test('renders a clear button to reset input and output', () => {
    render(<Calculator />);
    const clearButton = screen.getByText('Clear');
    expect(clearButton).toBeInTheDocument();
  });

  test('renders an equal button to compute the result', () => {
    render(<Calculator />);
    const equalsButton = screen.getByText('=');
    expect(equalsButton).toBeInTheDocument();
  });

  test('displays both inputs and the result clearly in the UI', () => {
    render(<Calculator />);
    const inputDisplay = screen.getByText(/Input: 0/i);
    const resultDisplay = screen.getByText(/Result: 0/i);

    expect(inputDisplay).toBeInTheDocument();
    expect(resultDisplay).toBeInTheDocument();
  });

  // Error Handling
  test('handles division by zero gracefully', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input A / 0
    fireEvent.click(screen.getByText('A'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: 0');
  });

  test('prevents operations that exceed 4-digit output limit', () => {
    render(<Calculator />);
    const resultDisplay = screen.getByText(/Result: 0/i);
    
    // Input FF * FF * FF (this will give FD02FF, which is a invalid 6-digit result)
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('*'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('F'));
    fireEvent.click(screen.getByText('='));
    
    expect(resultDisplay).toHaveTextContent('Result: ERR');
  });
});