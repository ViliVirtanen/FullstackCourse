import React,{ useState, useEffect } from "react";
import axios from "axios";

const Filter = ({value, handleChange}) => {
  return (
    <div>
      find countries <input 
            value={value}
            onChange={handleChange}/> 
    </div>
  )
}

const Countries = ({countries}) => {
  const correctLength = countries.length <= 10
  if (countries.length === 1) {
    const country = countries[0]
    return (
    <FinalCountry key={country.cca2} country={countries[0]} />
    )
  } else {
    
  
   return (
   <ul>
   { 
   correctLength
   ? countries.map(country => 
    <div>
   <Country key={country.name.common} country={country} />
   <Button onClick={() => handleClick(country)}/>
   </div>
   )
   : "Too many matches, specify another filter"
   }
 </ul>
  )
  }
 }
 const Button = ({onClick}) => {
   return (
     <button onClick={onClick}> Show </button>
   )
 }
 
 const FinalCountry = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>Languages:</h3>
      <ul>{Object.values(country.languages).map(lang => 
         <li>{lang}</li>
      )}</ul>
      <img src={country.flags.png }/>
      
    </div>
    
  )
}
const handleClick = (country) => {
  return (
    <FinalCountry key={country.name.common} country={country}/>
  )
}
 const Country = ({country}) => {
  return (
    <p>{country.name.common}</p>
  )
}
const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        
        setCountries(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const countriesToShow = () => {
    if (newFilter === '') {
      return []
    } else {
      return countries.filter(
              coutry => coutry.name.common.toLowerCase()
                .includes(newFilter.toLowerCase()
                ))
      
      }
    }

  return (

     <div> <Filter value={newFilter} handleChange={handleFilterChange} />
           <Countries countries={countriesToShow()} /> 
        </div>
  )
}
export default App;
