import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/App.css';

const Calculator: React.FC = () => {
    /** State for current input value (hexadecimal string) */
    const [input, setInput] = useState('');
    
    /** State for current calculation result (hexadecimal string or null) */
    const [result, setResult] = useState<string | null>(null);
    
    /** State for current operation (+, -, *, / or null) */
    const [operation, setOperation] = useState<string | null>(null);
    
    /** State for the full expression being built */
    const [expression, setExpression] = useState('');

    /* Handles numeric and hexadecimal input (0-9, A-F)*/
    const handleInput = (value: string) => {
        if (/^[0-9A-F]$/.test(value) && input.length < 2) {
            setInput((prev) => prev + value);
        }
    };

    /*Handles operation button clicks*/
    const handleOperation = (op: string) => {
        if (input) {
            if (result && operation) {
                calculateIntermediateResult();
            } else {
                setResult(input);
            }
            
            if (result && operation) {
                setExpression(`${result}${operation}${input}`);
            } else {
                setExpression(input);
            }
            
            setInput('');
            setOperation(op);
        } else if (result && !input) {
            setOperation(op);
        }
    };

    /*Calculates intermediate results during operations*/
    const calculateIntermediateResult = () => {
        if (input && !operation) {
            setResult(input);
            return;
        }
        
        if (result && input && operation) {
            const num1 = parseInt(result, 16);
            const num2 = parseInt(input, 16);
            let calcResult = 0;

            switch (operation) {
                case '+':
                    calcResult = num1 + num2;
                    break;
                case '-':
                    calcResult = num1 - num2;
                    if (calcResult < 0) {
                        setResult('ERR');
                        setInput('0');
                        toast.error('Negative result not allowed', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        setTimeout(() => {
                            clearAll();
                        }, 1000);
                        return;
                    }
                    break;
                case '*':
                    calcResult = num1 * num2;
                    break;
                case '/':
                    if (num2 === 0) {
                        setResult('ERR');
                        setInput('0');
                        toast.error('Division by zero not allowed', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                        setTimeout(() => {
                            clearAll();
                        }, 1000);
                        return;
                    }
                    calcResult = Math.floor(num1 / num2);
                    break;
                default:
                    break;
            }

            const hexResult = calcResult.toString(16).toUpperCase();
            if (calcResult > 0xFFFF) {
                setResult('ERR');
                setInput('0');
                toast.error('Result exceeds maximum value (0xFFFF)', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    clearAll();
                }, 1000);
            } else {
                setResult(hexResult);
                setExpression(`${result}${operation}${input}`);
            }
            setInput('');
            setOperation(null);
        }
    };

    const clearAll = () => {
        setInput('');
        setResult(null);
        setOperation(null);
        setExpression('');
    };

    return (
        <div className="calculator-container">
            <ToastContainer />
            <div className="display-container">
                <div className="display-row">
                    <span className="display-label">Input:</span>
                    <span className="display-value">{input || '0'}</span>
                </div>
                <div className="display-row">
                    <span className="display-label">Result:</span>
                    <span className="display-value">{result || '0'}</span>
                </div>
            </div>
            
            <div className="calculator-grid">
                <div className="calculator-row">
                    <button 
                        className="clear-button"
                        onClick={clearAll}
                    >
                        C
                    </button>
                    <button 
                        className="equals-button"
                        onClick={calculateIntermediateResult}
                    >
                        =
                    </button>
                </div>
                <div className="calculator-row">
                    <button 
                        className="number-button"
                        onClick={() => handleInput('0')}
                    >
                        0
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('1')}
                    >
                        1
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('2')}
                    >
                        2
                    </button>
                    <button 
                        className="operation-button"
                        onClick={() => handleOperation('*')}
                    >
                        *
                    </button>
                </div>
                <div className="calculator-row">
                    <button 
                        className="number-button"
                        onClick={() => handleInput('3')}
                    >
                        3
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('4')}
                    >
                        4
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('5')}
                    >
                        5
                    </button>
                    <button 
                        className="operation-button"
                        onClick={() => handleOperation('-')}
                    >
                        -
                    </button>
                </div>
                <div className="calculator-row">
                    <button 
                        className="number-button"
                        onClick={() => handleInput('6')}
                    >
                        6
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('7')}
                    >
                        7
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('8')}
                    >
                        8
                    </button>
                    <button 
                        className="operation-button"
                        onClick={() => handleOperation('+')}
                    >
                        +
                    </button>
                </div>
                <div className="calculator-row">
                    <button 
                        className="number-button"
                        onClick={() => handleInput('9')}
                    >
                        9
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('A')}
                    >
                        A
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('B')}
                    >
                        B
                    </button>
                    <button 
                        className="operation-button"
                        onClick={() => handleOperation('/')}
                    >
                        /
                    </button>
                </div>
                <div className="calculator-row">
                    <button 
                        className="number-button"
                        onClick={() => handleInput('C')}
                    >
                        C
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('D')}
                    >
                        D
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('E')}
                    >
                        E
                    </button>
                    <button 
                        className="number-button"
                        onClick={() => handleInput('F')}
                    >
                        F
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Calculator;