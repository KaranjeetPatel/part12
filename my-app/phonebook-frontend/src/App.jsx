import React, { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(data => {
                setPersons(data)
            })
    }, [])

    const addName = (event) => {
        event.preventDefault()

        const nameObject = {
            name: newName,
            number: newNumber
        }
        const findName = persons.find(element => element.name === nameObject.name)
        if (findName) {
            if (window.confirm(`${nameObject.name} 
          is already in the phonebook, replace the old number with a new one?`)) {
                personService
                    .update(findName.id, nameObject)
                    .then(data => {
                        /*              console.log("Data", data)  */
                        if (data) {
                            setPersons(persons.map(elt => elt.id === findName.id ? data : elt))
                            setNewName('')
                            setNewNumber('')
                            note(`${nameObject.name} number was updated`)
                        } else {
                            note(`Information of ${nameObject.name} has already been removed from server`)
                            setPersons(persons.filter(person => person.id !== findName.id))
                            setNewName('')
                            setNewNumber('')
                        }
                    })
                    .catch(error => {
                        setNewName('')
                        setNewNumber('')
                        note(error.response.data.error)
                        console.log(error.response.data.error)
                    })
            } else {
                setNewName('')
                setNewNumber('')
            }
        } else {
            personService
                .create(nameObject)
                .then(data => {
                    setPersons(persons.concat(data))
                    setNewName('')
                    setNewNumber('')
                    note(`${nameObject.name} is added to phonebook`)
                })
                .catch(error => {
                    setNewName('')
                    setNewNumber('')
                    note(error.response.data.error)
                    console.log(error.response.data.error)
                })
        }
    }

    const deleteName = (id) => {
        const person = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            personService
                .remove(id)
                .then(() => {
                    const newPersons = persons.filter(person => person.id !== id)
                    setPersons(newPersons)
                    note(`${person.name} record was deleted`)
                })
                .catch(() => {
                    note(`Information of ${person.name} has already been removed form server`
                    )
                    setPersons(persons.filter(p => p.id !== id))
                })
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
    }

    const filterNames = (persons, substring) =>
        persons.filter(person => person.name.toLowerCase().includes(substring.toLowerCase()))
    const filteredNames = filterNames(persons, newFilter)

    const note = (msg) => {
        setNotification(msg)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
            <Notification message={notification} />
            <h2>Add a new record</h2>
            <PersonForm
                addName={addName}
                newName={newName}
                newNumber={newNumber}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <table>
                <tbody>
                    <Persons filteredNames={filteredNames} remove={deleteName}/>
                </tbody>
            </table>
        </div>
    )
}

export default App
