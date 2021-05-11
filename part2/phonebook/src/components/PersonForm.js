import React from 'react'
import Input from './Input'

const PersonForm = ({ handleSubmit, newName, handleNewNameChange, newNumber, handleNewNumberChange }) => {

  return (
    <form onSubmit={handleSubmit}>
      <Input
        text="name: "
        placeholder="enter name"
        value={newName}
        onChange={handleNewNameChange}
      />
      <Input
        text="number: "
        placeholder="enter number"
        value={newNumber}
        onChange={handleNewNumberChange}
      />
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm
