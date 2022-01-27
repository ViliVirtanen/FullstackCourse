import React, { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const StatisticLine = ({text, num}) => {
  return (
    <tbody>
    <tr> 
      <td>{text} </td>
      <td>{num}</td> 
      </tr>
    </tbody>
  )
}

const Statistics = ({data}) => {
  if (data.all > 0) {
  return (
    <div>
      <h2> statistics </h2>
      <table>
      <StatisticLine text="good" num={data.good} />
      <StatisticLine text="neutral" num={data.neut} />
      <StatisticLine text="bad" num={data.bad} /> 
      <StatisticLine text="all" num={data.all} /> 
      <StatisticLine text="average" num={data.avg} /> 
      <StatisticLine text="positive" num={data.pos} /> 
      </table>
    </div>
  )
  } else {
    return (
      <div>
      <h2> statistics </h2>
      <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const a = good + neutral + bad
  const p =  good/a *100
  const data = {
    good: good,
    neut: neutral,
    bad: bad,
    all: a,
    avg: (good - bad)/ a,
    pos: String(p) + "%",
  }

  const add = (value) => {
    if (value === "G") { setGood(good + 1 ) }
    if (value === "N") { setNeutral(neutral + 1 ) }
    if (value === "B") { setBad(bad + 1 ) }
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={() => add("G")} text="good" /> 
      <Button handleClick={() => add("N")} text="neutral" /> 
      <Button handleClick={() => add("B")} text="bad" /> 
      <Statistics data={data} />
    </div>
  )
}

export default App
