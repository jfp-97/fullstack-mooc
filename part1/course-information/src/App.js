import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content 
        name1={part1.name} exerciseAmount1={part1.exercises}
        name2={part2.name} exerciseAmount2={part2.exercises}
        name3={part3.name} exerciseAmount3={part3.exercises}
      />
      <Total amount={part1.exercises + part2.exercises + part3.exercises} />
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
