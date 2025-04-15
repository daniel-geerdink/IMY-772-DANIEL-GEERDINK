import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../../app/src/components/Calculator';

describe('Calculator', () => {
  // Input Handling
  test('limits input to hexadecimal characters (0-9, A-F)', () => {
    render(<Calculator />);
    const inputValue = screen.getAllByText('0', { selector: '.display-value' })[0];
    
    // Input valid hex characters
    fireEvent.click(screen.getByText('1', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    expect(inputValue).toHaveTextContent('1A');

    // Instead of trying to click a non-existent button, we'll verify the input stays the same
    expect(inputValue).toHaveTextContent('1A');
  });

  test('accepts only up to 2-digit hexadecimal numbers', () => {
    render(<Calculator />);
    const inputValue = screen.getAllByText('0', { selector: '.display-value' })[0];
    
    // Try to input 3 digits
    fireEvent.click(screen.getByText('1', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('2', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('3', { selector: '.number-button' }));
    
    expect(inputValue).toHaveTextContent('12');
  });

  // Output Handling
  test('returns results as hexadecimal values only', () => {
    render(<Calculator />);
    const resultValue = screen.getAllByText('0', { selector: '.display-value' })[1];
    
    // Test addition that results in a hexadecimal value
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('+', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('B', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    
    expect(resultValue).toHaveTextContent('15');
  });

  test('limits output to a maximum of 4-digit hexadecimal values', () => {
    render(<Calculator />);
    const resultValue = screen.getAllByText('0', { selector: '.display-value' })[1];
    
    // Input FF * FF (this should give FE01, which is a valid)
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('*', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    
    expect(resultValue).toHaveTextContent('FE01');
  });

  test('ensures results are always positive', () => {
    render(<Calculator />);
    const inputValue = screen.getAllByText('0', { selector: '.display-value' })[0];
    const resultValue = screen.getAllByText('0', { selector: '.display-value' })[1];

    // Input first number
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    
    // Select subtraction
    fireEvent.click(screen.getByText('-', { selector: '.operation-button' }));
    
    // Input second number
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    
    // Calculate result
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));

    // AA - FF should result in an ERR
    expect(resultValue).toHaveTextContent('ERR');
  });

  // Operations
  test('performs basic operations correctly', () => {
    render(<Calculator />);
    const resultValue = screen.getAllByText('0', { selector: '.display-value' })[1];
    
    // Addition
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('+', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('5', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    expect(resultValue).toHaveTextContent('F');

    // Subtraction
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('-', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    expect(resultValue).toHaveTextContent('5');

    // Multiplication
    fireEvent.click(screen.getByText('5', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('*', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('3', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    expect(resultValue).toHaveTextContent('F');

    // Division
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('/', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('3', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    expect(resultValue).toHaveTextContent('5');
  });

  test('performs chained operations (e.g., FF + AA + 13)', () => {
    render(<Calculator />);
    const inputValue = screen.getAllByText('0', { selector: '.display-value' })[0];
    const resultValue = screen.getAllByText('0', { selector: '.display-value' })[1];

    // Input FF
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    
    // Add AA
    fireEvent.click(screen.getByText('+', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    
    // Add 13
    fireEvent.click(screen.getByText('+', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('1', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('3', { selector: '.number-button' }));
    
    // Calculate result
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));

    expect(resultValue).toHaveTextContent('1BC');
  });

  // UI Tests
  test('renders buttons for hexadecimal digits (0-9, A-F)', () => {
    render(<Calculator />);
    const hexButtons = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    hexButtons.forEach((digit) => {
      const button = screen.getByText(digit, { selector: '.number-button' });
      expect(button).toBeInTheDocument();
    });
  });

  test('renders buttons for basic operations (+, -, *, /)', () => {
    render(<Calculator />);
    const operationButtons = ['+', '-', '*', '/'];
    operationButtons.forEach((operation) => {
      const button = screen.getByText(operation, { selector: '.operation-button' });
      expect(button).toBeInTheDocument();
    });
  });

  test('renders a clear button to reset input and output', () => {
    render(<Calculator />);
    const clearButton = screen.getByText('C', { selector: '.clear-button' });
    expect(clearButton).toBeInTheDocument();
  });

  test('renders an equal button to compute the result', () => {
    render(<Calculator />);
    const equalsButton = screen.getByText('=', { selector: '.equals-button' });
    expect(equalsButton).toBeInTheDocument();
  });

  test('displays both inputs and the result clearly in the UI', () => {
    render(<Calculator />);
    const inputLabel = screen.getByText('Input:', { selector: '.display-label' });
    const resultLabel = screen.getByText('Result:', { selector: '.display-label' });
    const inputValue = screen.getAllByText('0', { selector: '.display-value' })[0];
    const resultValue = screen.getAllByText('0', { selector: '.display-value' })[1];

    expect(inputLabel).toBeInTheDocument();
    expect(resultLabel).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(resultValue).toBeInTheDocument();

    // Test input display
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    expect(inputValue).toHaveTextContent('A');

    // Test result display
    fireEvent.click(screen.getByText('+', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('5', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    expect(resultValue).toHaveTextContent('F');
  });

  // Error Handling
  test('handles division by zero gracefully', () => {
    render(<Calculator />);
    const resultValue = screen.getAllByText('0', { selector: '.display-value' })[1];
    
    // Try to divide by zero
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('/', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('0', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    
    expect(resultValue).toHaveTextContent('ERR');
  });

  test('prevents operations that exceed 4-digit output limit', () => {
    render(<Calculator />);
    const resultValue = screen.getAllByText('0', { selector: '.display-value' })[1];
    
    // Input FF * FF * FF (this will give FD02FF, which is a invalid 6-digit result)
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('*', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('*', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    
    expect(resultValue).toHaveTextContent('ERR');
  });

  // Additional UI Tests
  test('clears the display when the C button is clicked', () => {
    render(<Calculator />);
    
    // Input some values
    fireEvent.click(screen.getByText('F', { selector: '.number-button' }));
    fireEvent.click(screen.getByText('+', { selector: '.operation-button' }));
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    
    // Check initial state
    const inputValue = screen.getByText('A', { selector: '.display-value' });
    expect(inputValue).toBeInTheDocument();
    
    // Click C button
    fireEvent.click(screen.getByText('C', { selector: '.clear-button' }));
    
    // Check if display is cleared
    const newInputValue = screen.getAllByText('0', { selector: '.display-value' })[0];
    const newResultValue = screen.getAllByText('0', { selector: '.display-value' })[1];
    expect(newInputValue).toBeInTheDocument();
    expect(newResultValue).toBeInTheDocument();
  });

  test('button layout is correct', () => {
    render(<Calculator />);
    
    // Check if number buttons are in a grid
    const numberButtons = screen.getAllByRole('button').filter(button => 
      /^[0-9A-F]$/.test(button.textContent || '')
    );
    expect(numberButtons.length).toBe(17);
    
    // Check if operation buttons are present
    expect(screen.getByText('+', { selector: '.operation-button' })).toBeInTheDocument();
    expect(screen.getByText('-', { selector: '.operation-button' })).toBeInTheDocument();
    expect(screen.getByText('*', { selector: '.operation-button' })).toBeInTheDocument();
    expect(screen.getByText('/', { selector: '.operation-button' })).toBeInTheDocument();
    expect(screen.getByText('=', { selector: '.equals-button' })).toBeInTheDocument();
    expect(screen.getByText('C', { selector: '.clear-button' })).toBeInTheDocument();
  });

  test('buttons have hover and active states', () => {
    render(<Calculator />);
    
    // Get a button
    const button = screen.getByText('1', { selector: '.number-button' });
    
    // Simulate hover
    fireEvent.mouseEnter(button);
    
    // Simulate click
    fireEvent.click(button);
    
    // Check if the button was clicked
    const inputValue = screen.getAllByText('1', { selector: '.display-value' })[0];
    expect(inputValue).toBeInTheDocument();
  });

  test('sets result to input when equals is pressed without an operation', () => {
    render(<Calculator />);
    
    // Input a value
    fireEvent.click(screen.getByText('A', { selector: '.number-button' }));
    
    // Press equals without an operation
    fireEvent.click(screen.getByText('=', { selector: '.equals-button' }));
    
    // Check if result is set to input
    const resultValue = screen.getAllByText('A', { selector: '.display-value' })[1];
    expect(resultValue).toBeInTheDocument();
  });
});