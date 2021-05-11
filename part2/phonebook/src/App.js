import React, { useState, useEffect } from 'react'
import PersonTable from './components/PersonTable'
import Input from './components/Input'
import PersonForm from './components/PersonForm'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filter, setFilter] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const shownPersons = () => persons.filter(person => new RegExp(filter, 'i').test(person.name))

  const handleInputChange = (setter) => {
    return (event) => setter(event.target.value)
  }

  const handleDelete = (id, name) => {
    return (event) => {
      event.preventDefault()
      if (window.confirm(`Delete ${name} ?`)) {
        personService
          .remove(id)
          .then(setPersons(persons.filter(person => person.id !== id)))
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      updatePerson(newName, newNumber)
    } else {
      createPerson(newName, newNumber)
    }

    setNewName('')
    setNewNumber('')
  }

  const createPerson = (name, number) => {
    personService
      .create({ name, number })
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
      })
  }

  const updatePerson = (name, number) => {
    if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      personService
        .update(
          persons.find(person => person.name === newName).id,
          { name, number }
        )
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input
        text="filter shown with "
        placeholder="enter filter..."
        value={filter}
        onChange={handleInputChange(setFilter)}
      />

      <h3>add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewNameChange={handleInputChange(setNewName)}
        newNumber={newNumber}
        handleNewNumberChange={handleInputChange(setNewNumber)}
      />

      <h3>Numbers</h3>
      <PersonTable persons={shownPersons()} handleDelete={handleDelete} />
    </div>
  )
}

export default App
