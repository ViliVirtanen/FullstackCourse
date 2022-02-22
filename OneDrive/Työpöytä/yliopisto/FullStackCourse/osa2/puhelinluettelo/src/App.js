import React, { useState, useEffect } from 'react'
import {PersonForm,Person,Filter, Notification} from "./components.js"
import personService from './services/persons.js'
 
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState('')
  const [error, setError] = useState(false)
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    const result = window.confirm(`Delete ${person.name}`)

    result 
    ? personService
          .del(id)
          .then( setPersons(persons.filter(n => n.id !== id)),
                 setNotifMessage(`${person.name} deleted successfully`),
                 setError(false))
          .catch( error => {
            console.log("not needed?")
          })
    : setPersons(persons)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (!persons.map(per => per.name)
                .includes( newName)) {

    const personObj = {
      name: newName,
      number: newNumber,
    }
    personService
         .create(personObj)
         .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')
            setError(false)
            setNotifMessage(`${response.data.name} added successfully`)
         } )

  } else {
   const popup = window.confirm(
     `${newName} is already added to phonebook, replace the old number with a new one?`)

   const person = persons.find(n => n.name === newName)
   const changedPerson = { ...person, number: newNumber}
    popup
    ? personService
        .update(person.id, changedPerson)
        .then(response => {
          setPersons(persons.map(per =>
            per.name !== newName ? per : response.data))
          setNewName('')
          setNewNumber('')
          setError(false)
          setNotifMessage(`${response.data.name}'s number updated successfully`)
          })
          .catch(error => {
            setError(true)
            setNotifMessage(`Information of ${person.name} has already been removed from server`)
          })
    : setPersons(persons)
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
      <Notification message={notifMessage} error={error}  />
      <Filter value={newFilter} handleChange={handleFilterChange} /> 
    
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName} 
        newNumber={newNumber}
        nameChange={handleNameChange}
        numberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      {personsToShow().map(person => 
     <Person key={person.name} person={person} del={() => deletePerson(person.id)} />
     )}
    </div>
  )

}

export default App
