import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = props => <h1>{props.course}</h1>

const Content = props => (
  <div>
    <Part name={props.parts[0].name} exerciseAmount={props.parts[0].exercises} />
    <Part name={props.parts[1].name} exerciseAmount={props.parts[1].exercises} />
    <Part name={props.parts[2].name} exerciseAmount={props.parts[2].exercises} />
  </div>
)

const Part = props => <p>{props.name} {props.exerciseAmount}</p>

const Total = props => (
  <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
)

export default App
