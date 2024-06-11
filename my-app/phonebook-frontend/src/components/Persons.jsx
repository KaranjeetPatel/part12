import React from 'react'
import Person from './Person'
const Persons = ({ filteredNames, remove }) => filteredNames.map(person =>
    <Person key={person.id} name={person.name} number={person.number} remove={() => remove(person.id)}/>
)

export default Persons
