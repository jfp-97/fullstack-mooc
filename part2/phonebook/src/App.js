import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filter, setFilter] = useState('')

  const shownPersons = () => persons.filter(person => new RegExp(filter, 'i').test(person.name))

  return (
    <div>
      <Header text="Phonebook" /> 
      <ControlledInput
        text="filter shown with"
        placeholder="enter filter"
        value={filter}
        setValue={setFilter}
      />

      <Header text="add a new" />
      <Form persons={persons} setPersons={setPersons} />

      <Header text="Numbers" />
      <Numbers persons={shownPersons()} />
    </div>
  )
}

const Header = ({ text }) => <h2>{text}</h2>

const Form = ({ persons, setPersons }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <ControlledInput
        text="name: "
        placeholder="enter name"
        value={newName}
        setValue={setNewName}
      />
      <ControlledInput
        text="number: "
        placeholder="enter number"
        value={newNumber}
        setValue={setNewNumber}
      />
      <Button text="add" />
    </form>
  )
}

const ControlledInput = ({ text, placeholder, value, setValue }) => {
  const handleInputChange = (setter) => {
    return (event) => setter(event.target.value)
  }

  return (
    <div>
      {text}
      <input placeholder={placeholder} value={value} onChange={handleInputChange(setValue)} />
    </div>
  )
}

const Button = ({ text }) => <button type="submit">{text}</button>

const Numbers = ({ persons }) => (
  <table>
    <tbody>
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
      )}
    </tbody>
  </table>
)

const Person = ({ name, number }) => (
  <tr>
    <td>{name}</td>
    <td>{number}</td> 
  </tr>
)

export default App
