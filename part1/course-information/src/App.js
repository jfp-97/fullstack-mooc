import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content content={[
        { name: part1, exerciseAmount: exercises1 },
        { name: part2, exerciseAmount: exercises2 },
        { name: part3, exerciseAmount: exercises3 },
      ]} />
      <Total amount={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = props => <h1>{props.course}</h1>

const Content = props => (
  props.content.map((section, index) => 
    <p key={index}>
      {section.name} {section.exerciseAmount}
    </p>
  )
)

const Total = props => (
  <p>Number of exercises {props.amount}</p>
)

export default App
