# Hexadecimal Calculator Application


## Overview
This calculator application performs basic arithmetic on hexadecimal numbers with certain constraints.


## Functional Requirements

| **Category**                   | **Functional Requirement**                                                                   |
|--------------------------------|---------------------------------------------------------------------------------------------|
| **Input Handling**             | Limit input to hexadecimal numbers only (0-9, A-F)                                         |
|                                | Accept only up to 2-digit hexadecimal numbers per operand                                   |
|                                | Display an error when invalid characters are input                                         |
| **Output Handling**            | Return results as hexadecimal values only                                                  |
|                                | Limit output to a maximum of 4-digit hexadecimal values                                    |
|                                | Ensure results are always positive (no negative results)                                   |
|                                | Do not return results with decimal places (only integers)                                  |
| **Operations**                 | Perform addition on two valid hexadecimal numbers                                          |
|                                | Perform subtraction ensuring no negative results                                           |
|                                | Perform multiplication of two valid hexadecimal numbers                                    |
|                                | Perform division and round down to the nearest whole number (floor division)               |
| **User Interface (UI)**        | Provide buttons for hexadecimal digits (0-9, A-F)                                         |
|                                | Provide buttons for basic operations (+, -, *, /)                                         |
|                                | Provide a clear button to reset input and output                                         |
|                                | Provide an equal (=) button to compute the result                                          |
|                                | Display both inputs and the result clearly in the UI                                       |
| **Error Handling**             | Display user-friendly error messages for invalid inputs or operations                     |
|                                | Handle division by zero gracefully with an appropriate message                             |
| **Validation Logic**           | Ensure all inputs and outputs are follow the 2-digit input and 4-digit output constraints   |
|                                | Prevent operations that would result in outputs exceeding the 4-digit limit              |
| **Test-Driven Development**    | Implement tests for all input constraints and arithmetic operations                        |
|                                | Automate tests using GitHub Actions on every push request                         |

---
  
## Project Structure

- **packages/app**: Contains the main application code.
  - **public/index.html**: The main HTML file for the application.
  - **src/components/Calculator.tsx**: The Calculator component with logic and UI.
  - **src/App.tsx**: The main App component that integrates the Calculator.
  - **src/index.tsx**: The entry point for the React application.
  - **src/styles/App.css**: CSS styles for the application.
  - **package.json**: Configuration file for the app package.
  - **tsconfig.json**: TypeScript configuration file.

- **packages/tests**: Contains the test files.
  - **unit/Calculator.test.tsx**: Unit tests for the Calculator component.
  - **e2e/Calculator.e2e.test.ts**: End-to-end tests for the Calculator application.
  - **package.json**: Configuration file for the tests package.

- **.github/workflows**: Contains the CI configuration for GitHub Actions.
  - **ci.yml**: Defines the workflow for continuous integration.

## Getting Started

To get started with the calculator application, follow these steps:

1. Install dependencies:
   ```
   yarn install
   ```

2. Run the application:
   ```
   yarn workspace app start
   ```

3. Run tests:
   ```
   yarn workspace tests test
   ```
