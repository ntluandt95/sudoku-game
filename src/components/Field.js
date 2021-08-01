import React, { useState } from 'react'

function Field(props) {
    const [color, setColor] = useState('white')
    var field = props.field

    function handleChange(e) {
        const value = parseInt(e.target.value)
        var safe = props.onChange({ ...props.field, value: value })
        if (safe) {

            setColor('green')
        } else {

            setColor('red')
        }
        if (value == null) {
            setColor('white')
        }
        return safe
    }
    function handleKeyDown(e) {
        var key = parseInt(e.key)
        if (!field.readOnly &&
            (key == 1 || key == 2 || key == 3 || key == 4 || key == 5 || key == 6 || key == 7 || key == 8 || key == 9)) {
            console.log()
            document.getElementById(field.row * 9 + field.col).value = ''
        }



    }
    return (
        <input type='number' id={field.row * 9 + field.col} className='cell' defaultValue={field.value} readOnly={field.readOnly} onChange={handleChange} style={{ backgroundColor: color }} onKeyDown={handleKeyDown} />

    )
}


export default Field

