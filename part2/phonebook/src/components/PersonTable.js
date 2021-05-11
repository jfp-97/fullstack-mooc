import React from 'react'

const PersonTable = ({ persons, handleDelete }) => {

  return (
    <table>
      <tbody>
        {persons.map(person =>
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <form onSubmit={handleDelete(person.id, person.name)}>
                <button type="submit">delete</button>
              </form>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default PersonTable
