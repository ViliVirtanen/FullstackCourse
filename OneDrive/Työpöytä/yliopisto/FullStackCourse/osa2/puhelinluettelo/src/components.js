import React from "react"

const Persons = ({persons}) => {
    return (
     <ul>
     {persons.map(person => 
     <Person key={person.name} person={person} />
     )}
   </ul>
    )
   }
   const PersonForm = (props) => {
     return (
       <form onSubmit={props.onSubmit}>
           <div>
             name: <input 
               value={props.newName}
               onChange={props.nameChange}/>
           </div>
           <div>
             number: <input 
               value={props.newNumber}
               onChange={props.numberChange} />
           </div>
           <div>
             <button type="submit">add</button>
           </div>
         </form>
     )
   }
   
   const Filter = ({value, handleChange}) => {
     return (
       <div>
         filter shown with <input 
               value={value}
               onChange={handleChange}/> 
       </div>
     )
   }
   const Person = ({person}) => {
     return (
       <p>{person.name} {person.number}</p>
     )
   }

   export {Person,Filter,PersonForm,Persons }