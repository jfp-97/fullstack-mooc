import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => {
      return response.data
    })
}

const create = (newPerson) => {
  return axios
    .post(baseUrl, {
      name: newPerson.name,
      number: newPerson.number
    })
    .then(response => {
      return response.data
    })
}

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
}

const update = (id, newPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then(response => {
      return response.data
    })
}

const personService = {
  getAll,
  create,
  remove,
  update
}

export default personService
