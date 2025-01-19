'use client'

import React, { useState } from 'react'
import { Card } from './card'
import { sin, cos, tan, log } from 'mathjs'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [isDegreeMode, setIsDegreeMode] = useState(true)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit)
    }
  }

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
      setWaitingForOperand(false)
    }
  }

  const clearDisplay = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (prevValue == null) {
      setPrevValue(inputValue)
    } else if (operation) {
      const currentValue = prevValue || 0
      const newValue = performCalculation[operation](currentValue, inputValue)

      setPrevValue(newValue)
      setDisplay(String(newValue))
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const performUnaryOperation = (operation) => {
    const inputValue = parseFloat(display)
    let newValue;
    if (operation === 'sin' || operation === 'cos' || operation === 'tan') {
      const radians = isDegreeMode ? (inputValue * Math.PI) / 180 : inputValue;
      newValue = performCalculation[operation](radians);
    } else {
      newValue = performCalculation[operation](inputValue);
    }
    setDisplay(String(newValue))
    setWaitingForOperand(true)
  }

  const performCalculation = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue,
    'sin': (value) => sin(value),
    'cos': (value) => cos(value),
    'tan': (value) => tan(value),
    'log': (value) => log(value, 10),
    'ln': (value) => log(value),
    'sqrt': (value) => Math.sqrt(value),
  }

  return (
    <Card title="Calculator" className="bg-gray-800 text-white shadow-md p-3">
      <div className="mb-3 text-right text-2xl bg-gray-700 p-2 rounded border border-gray-600">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            onClick={() => inputDigit(num)}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm"
          >
            {num}
          </button>
        ))}
        <button onClick={inputDot} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm">.</button>
        <button onClick={() => performOperation('+')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">+</button>
        <button onClick={() => performOperation('-')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">-</button>
        <button onClick={() => performOperation('*')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">×</button>
        <button onClick={() => performOperation('/')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">÷</button>
        <button onClick={() => performOperation('=')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm col-span-2">=</button>
        <button onClick={clearDisplay} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm col-span-2">C</button>
        <button onClick={() => performUnaryOperation('sin')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm">sin</button>
        <button onClick={() => performUnaryOperation('cos')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm">cos</button>
        <button onClick={() => performUnaryOperation('tan')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm">tan</button>
        <button onClick={() => performUnaryOperation('log')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm">log</button>
        <button onClick={() => performUnaryOperation('ln')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm">ln</button>
        <button onClick={() => performUnaryOperation('sqrt')} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm">√</button>
        <button 
          onClick={() => setIsDegreeMode(!isDegreeMode)} 
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm col-span-2"
        >
          {isDegreeMode ? 'DEG' : 'RAD'}
        </button>
      </div>
    </Card>
  )
}

