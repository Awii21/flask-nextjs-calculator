'use client'

import React, { useState } from 'react';

export default function Home() {
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

    const handleButtonClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput('');
        setError(null);
    };

    const handleCalculate = () => {
        try {
            const match = input.match(/(\d+)([+\-*/])(\d+)/);
            if (!match) {
                setError('Invalid input');
                return;
            }

            const [num1, operation, num2] = match.slice(1);
            fetch('http://127.0.0.1:5328/api/data/calc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    num1: parseInt(num1, 10),
                    num2: parseInt(num2, 10),
                    operation: {
                        '+': 'add',
                        '-': 'subtract',
                        '*': 'multiply',
                        '/': 'divide'
                    }[operation]
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setInput(String(data.result));
                        setError(null);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setError('Something went wrong');
                });
        } catch (error) {
            setError('Invalid input');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cyan-950 py-10 text-black">
            <h1 className="text-4xl font-bold mb-6 text-gray-100">Calculator</h1>
            <div className='text-gray-200 text-xl font-semibold'>Frontend - Next.js | Backend - Flask</div>
            <div className="bg-yellow-300 p-6 rounded-xl shadow-md w-80 scale-125 mt-16">
                <div className="mb-4 text-right text-5xl p-2">
                    {error ? <span className="text-red-500">{error}</span> : input || '0'}
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {['7', '8', '9', '/'].map((value) => (
                        <button
                            key={value}
                            onClick={() => handleButtonClick(value)}
                            className="bg-purple-900 text-white p-4 rounded-full text-xl hover:scale-110 hover:bg-purple-800 hover:-translate-y-1 hover:-translate-y-1 transition-all duration-200 ease-in-out hover:drop-shadow-2xl hover:font-bold"
                        >
                            {value}
                        </button>
                    ))}
                    {['4', '5', '6', '*'].map((value) => (
                        <button
                            key={value}
                            onClick={() => handleButtonClick(value)}
                            className="bg-purple-900 text-white p-4 rounded-full text-xl hover:scale-110 hover:bg-purple-800 hover:-translate-y-1 transition-all duration-200 ease-in-out hover:drop-shadow-2xl hover:font-bold"
                        >
                            {value}
                        </button>
                    ))}
                    {['1', '2', '3', '-'].map((value) => (
                        <button
                            key={value}
                            onClick={() => handleButtonClick(value)}
                            className="bg-purple-900 text-white p-4 rounded-full text-xl hover:scale-110 hover:bg-purple-800 hover:-translate-y-1 transition-all duration-200 ease-in-out hover:drop-shadow-2xl hover:font-bold"
                        >
                            {value}
                        </button>
                    ))}
                    {['0', 'C', '=', '+'].map((value) => (
                        <button
                            key={value}
                            onClick={() => value === 'C' ? handleClear() : value === '=' ? handleCalculate() : handleButtonClick(value)}
                            className={`${
                                value === '=' ? 'bg-blue-700 hover:bg-blue-500' : 'bg-purple-900 hover:bg-purple-800'
                            } p-4 rounded-full text-xl hover:scale-110 transition-all hover:-translate-y-1 duration-200 ease-in-out hover:drop-shadow-2xl hover:font-bold text-white`}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
