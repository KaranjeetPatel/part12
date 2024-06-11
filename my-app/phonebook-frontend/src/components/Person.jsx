import React from 'react'
const Person = ({ name, number, remove }) =>
    <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td>
            <button onClick={remove}>delete</button>
        </td>
    </tr>

export default Person
