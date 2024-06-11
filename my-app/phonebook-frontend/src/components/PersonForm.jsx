import React from 'react'
const PersonForm = ({ addName, newName, newNumber, handleNameChange, handleNumberChange }) => (
    <form onSubmit = {addName}>
        <div>name : <input value={newName} onChange={handleNameChange}/></div>
        <div>number : <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">Add</button></div>
    </form>
)

export default PersonForm
