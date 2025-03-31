import React, { useState } from 'react';

const Calculator: React.FC = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [operation, setOperation] = useState<string | null>(null);

    const handleInput = (value: string) => {
        if (/^[0-9A-F]$/.test(value) && input.length < 2) {
            setInput((prev) => prev + value);
        }
    };

    const handleOperation = (op: string) => {
        if (input) {
            if (result && operation) {
                calculateIntermediateResult();
            } else {
                setResult(input);
            }
            setInput('');
            setOperation(op);
        }
    };

    const calculateIntermediateResult = () => {
        if (result && input && operation) {
            const num1 = parseInt(result, 16);
            const num2 = parseInt(input, 16);
            let calcResult = 0;

            switch (operation) {
                case '+':
                    calcResult = num1 + num2;
                    break;
                case '-':
                    calcResult = Math.max(0, num1 - num2);
                    break;
                case '*':
                    calcResult = num1 * num2;
                    break;
                case '/':
                    calcResult = num2 !== 0 ? Math.floor(num1 / num2) : 0;
                    break;
                default:
                    break;
            }

            const hexResult = calcResult.toString(16).toUpperCase();
            setResult(calcResult > 0xFFFF ? 'ERR' : hexResult);
            setInput('');
            setOperation(null);
        }
    };

    const clearAll = () => {
        setInput('');
        setResult(null);
        setOperation(null);
    };

    return (
        <div>
            <div>
                <div>Input: {input || '0'}</div>
                <div>Result: {result || '0'}</div>
            </div>
            <div>
                {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'].map((digit) => (
                    <button key={digit} onClick={() => handleInput(digit)}>
                        {digit}
                    </button>
                ))}
            </div>
            <div>
                {['+', '-', '*', '/'].map((op) => (
                    <button key={op} onClick={() => handleOperation(op)}>
                        {op}
                    </button>
                ))}
                <button onClick={calculateIntermediateResult}>=</button>
                <button onClick={clearAll}>Clear</button>
            </div>
        </div>
    );
}

export default Calculator;