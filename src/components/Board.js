import React from 'react'
import { useState, useEffect } from 'react'

import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";
import { useTimer } from 'react-timer-hook'
import Field from './Field'
function Board(props) {
    const [raw, setRaw] = useState(makepuzzle())
    const [board, setBoard] = useState(sudokuGenerator())
    const [solvePuzzle, setSolvePuzzle] = useState(solvepuzzle(raw))
    const [completed, setCompleted] = useState(false)
    const [second, setSecond] = useState('00')
    const [minute, setMinute] = useState('00')
    const [isActive, setIsActive] = useState(false)
    const [counter, setCounter] = useState(0)

    


    useEffect(() => {
        
        
        setIsActive(true)
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter(counter => counter + 1);
            }, 1000)
        }

        return () => clearInterval(intervalId);
        
    }, [isActive, counter])


    function sudokuGenerator() {
        const result = { rows: [] }
        for (let i = 0; i < 9; i++) {
            const row = { cols: [], index: i }
            for (let j = 0; j < 9; j++) {
                var value = raw[i * 9 + j]
                if (value != null) value++
                var col = {
                    row: i,
                    col: j,
                    value: value,
                    readOnly: value != null
                }

                row.cols.push(col)
            }
            result.rows.push(row)
        }
        
        return result
    }

    function safeToPut(field) {
        board.rows[field.row].cols[field.col].value = 0
        if (field.value <= 0 || field.value > 9) return false
        if (typeof (field.value) != 'number') return false
        for (let i = 0; i < 9; i++) {
            if (board.rows[field.row].cols[i].value === field.value) {
                console.log('false 1', field.row, i)
                return false
            }
            if (board.rows[i].cols[field.col].value === field.value) {
                console.log('false 2', i, field.col)
                return false
            }
        }

        //3 x 3 matrices coordinates
        var y = field.row - (field.row % 3)
        var x = field.col - (field.col % 3)

        for (let i = y; i < y + 3; i++) {
            for (let j = x; j < x + 3; j++) {
                if (board.rows[i].cols[j].value === field.value) {
                    console.log('false 3')
                    return false
                }
            }
        }

        return true
    }

    function onChange(field) {
        var safe = safeToPut(field)
        if (safe) {
            board.rows[field.row].cols[field.col] = field
            raw[field.row * 9 + field.col] = field.value - 1
        }
        setCompleted(isCompleted())
        console.log(completed)
        console.log(raw)
        console.log(solvePuzzle)
        return safe
    }
    function isCompleted() {
        for (let i = 0; i < raw.length; i++) {
            if (raw[i] !== solvePuzzle[i]) {
                console.log("false")
                return false
            }
        }
        setIsActive(false)
        return true
    }

    function setWin() {
        setCompleted(true)
    }
    function reset() {
        window.location.reload()
    }
    return (
        <div className='board'>
            <div className="time">
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
            </div>
            {board.rows.map((row) => (
                <div className='row' key={row.index}>{
                    row.cols.map((col) => (
                        <Field field={col} key={col.index} onChange={onChange} />
                    ))
                }</div>
            ))}
            {/* <a onClick={setWin} className='btn'>Win</a> */}
            {completed && <h1 className='alert'>You solved the puzzle in {minute} minutes and {second} seconds <button onClick={reset} className='btn'>Reset</button></h1>}
        </div>
    )
}

export default Board
