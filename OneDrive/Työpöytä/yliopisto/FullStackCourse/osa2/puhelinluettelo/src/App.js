import React, { useState } from 'react'
import {Person,PersonForm,Persons,Filter} from "./components.js"

 
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.map(per => per.name)
                .includes( newName)) {

    const personObj = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  } else {
    window.alert(`${newName} is already added to phonebook`)
  }
  }
  const personsToShow = () => {
    if (newFilter === '') {
      return persons
    } else {
      return persons.filter(
              person => person.name.toLowerCase()
                .includes(newFilter.toLowerCase()
                ))
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
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleChange={handleFilterChange} /> 
    
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName} 
        newNumber={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow()} /> 
    </div>
  )

}

export default App
