import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])

  const shownCountries = () => allCountries.filter(country => new RegExp(filter, 'i').test(country.name))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  return (
    <div>
      <ControlledInput text="find countries " placeholder="enter filter..." value={filter} setValue={setFilter} />
      <Display shownCountries={shownCountries()} />
    </div>
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

const Display = ({ shownCountries }) => {
  if (shownCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  else if (shownCountries.length === 1) {
    return <Country country={shownCountries[0]} />
  }

  else if (shownCountries.length === 0) {
    return <p>There are no matches, specify another filter</p>
  }

  else {
    return <NameList names={shownCountries.map(country => country.name)} />
  }
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
      <img src={country.flag} alt={`flag of ${country.name}`} height="150px" />
    </div>
  )
}

const NameList = ({ names }) => {
  return (
    <table>
      <tbody>
        {names.map(name => <tr key={name}><td>{name}</td></tr>)}
      </tbody>
    </table>
  )
}

export default App
