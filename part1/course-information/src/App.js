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
      <Content 
        name1={part1} exerciseAmount1={exercises1}
        name2={part2} exerciseAmount2={exercises2}
        name3={part3} exerciseAmount3={exercises3}
      />
      <Total amount={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

const Header = props => <h1>{props.course}</h1>

const Content = props => (
  <div>
    <Part name={props.name1} exerciseAmount={props.exerciseAmount1} />
    <Part name={props.name2} exerciseAmount={props.exerciseAmount2} />
    <Part name={props.name3} exerciseAmount={props.exerciseAmount3} />
  </div>
)

const Part = props => <p>{props.name} {props.exerciseAmount}</p>

const Total = props => (
  <p>Number of exercises {props.amount}</p>
)

export default App
