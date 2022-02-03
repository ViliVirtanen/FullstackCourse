import React from "react"

const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} part={part} /> 
          )}
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
  
  const Total = ({parts}) => {
    const total = parts.reduce( (s, p) => {
  
      return (s + p.exercises)
    },0)
    return (
      <h3>Total of {total} exercises</h3>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} /> 
        <Content parts={course.parts} />
        <Total parts={course.parts} /> 
      </div>
    )
  }
  export default Course