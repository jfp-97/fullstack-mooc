import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increase = (set, get) => () => set(get + 1)

  const handleGood = increase(setGood, good)
  const handleBad = increase(setNeutral, neutral)
  const handleNeutral = increase(setBad, bad)

  return (
    <div>
      <Header text="give feedback"/>
      
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleBad} />
      <Button text="bad" handleClick={handleNeutral} />
      
      <Header text="statistics"/>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
          <Statistic text="positive" value={good * 100 / (good + neutral + bad) + " %"} />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

export default App
