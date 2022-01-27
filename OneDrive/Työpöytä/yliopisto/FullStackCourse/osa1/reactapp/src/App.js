import React from 'react'

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} />
      <Part part={props.parts[1]} />
      <Part part={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises} </p>
  )
}

const Header = (props) => {
  return (
    <h1> {props.course} </h1>
  )
}

const Total = (props) => {
  const first = props.parts[0].exercises
  const second = props.parts[1].exercises
  const third = props.parts[2].exercises
  return (
    <p>Number of exercises {first + second +third}</p>
  )
}

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

export default App
