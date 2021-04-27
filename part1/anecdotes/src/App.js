import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(anecdotes.map(() => 0))
  
  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = () => {
    setPoints(points.map((amount, index) => amount + (index === selected ? 1 : 0)))
  }

  const mostVoted = () => {
    return points
      .map((amount, index) => ({ amount: amount, text: anecdotes[index] }))
      .reduce((a, b) => a.amount > b.amount ? a : b)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button text="vote" handler={handleVote} />
      <Button text="next anecdote" handler={handleNextAnecdote} />

      <Header text="Anecdote with most votes" />
      <Anecdote text={mostVoted().text} votes={mostVoted().amount} />
    </div>
  )
}

const Header = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const Button = ({ text, handler }) => (
  <button onClick={handler}>
        {text}
  </button>
)

export default App
