import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [filter, setFilter] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [singleCountry, setSingleCountry] = useState(false)

  const shownCountries = () => {
    return allCountries.filter(country => singleCountry
      ? country.name === singleCountry
      : new RegExp(filter, 'i').test(country.name)
    )
  }

  const handleInputChange = (event) => {
    setFilter(event.target.value)
    setSingleCountry(false)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Input text="find countries " placeholder="enter filter..." value={filter} setValue={handleInputChange} />
      <Display shownCountries={shownCountries()} setSingleCountry={setSingleCountry} />
    </div>
  )
}

const Input = ({ text, placeholder, value, setValue }) => {
  return (
    <div>
      {text}
      <input placeholder={placeholder} value={value} onChange={setValue} />
    </div>
  )
}

const Display = ({ shownCountries, setSingleCountry }) => {
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
    return <NameList setSingleCountry={setSingleCountry} names={shownCountries.map(country => country.name)} />
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
      <Weather city={country.capital} />
    </div>
  )
}

const NameList = ({ setSingleCountry, names }) => {

  const handleSubmit = (countryName) => {
    return (event) => {
      event.preventDefault()
      setSingleCountry(countryName)
    }
  }

  return (
    <div>
      {names.map(name => <CountryName key={name} name={name} handler={handleSubmit(name)} />)}
    </div>
  )
}

const CountryName = ({ name, handler }) => {
  return (
    <form onSubmit={handler}>
      {name}
      <button type="submit">show</button>
    </form>
  )
}

const Weather = ({ city }) => {
  const [info, setInfo] = useState({
    temperature: '',
    imageUrl: '',
    windSpeed: '',
    windDeg: ''
  })

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
      .then(response => {
        setInfo({
          temperature: Math.floor(response.data.main.temp - 273.15),
          imageUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          windSpeed: response.data.wind.speed,
          windDeg: response.data.wind.deg
        })
      })
  }, [city])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p><b>temperature: </b>{info.temperature} Celcius</p>
      <img src={info.imageUrl} height="50px" alt={`weather in ${city}`} />
      <p><b>wind: </b>{info.windSpeed} mph deg {info.windDeg}</p>
    </div>
  )
}

export default App
