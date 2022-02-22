import React from "react"


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
   const Person = ({person, del}) => {
     return (
       <p>{person.name} {person.number}
        <button onClick={del}>delete</button> </p>
     )
   }
   const Notification = ({ message, error }) => {
    if (message === '') {
      return null
    } else if (error) {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
     return (
      <div className="notif">
        {message}
      </div>
    )
  }
   export {Person,Filter,PersonForm, Notification}