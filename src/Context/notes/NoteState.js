// We will create a state that can be assceble for all

import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];


  const [notes, setnotes] = useState(notesInitial)

/* Getall Notes */

const getNotes = async () => {
    
  /*API call */
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
       'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODUxMjg1MzIwNmUwMzNhNDkxOTAxIn0sImlhdCI6MTYzNDIyNjQ5Mn0.dC4m-m79UqUcCOGgHNcw2g1iT7oPt0goCInlWAQfrl8'

    },
    
  });
  const json = await response.json();
  console.log(json);
  setnotes(json);

  
  //Adding a new node
  
}

















  //Add a note
  const addNote = async (title, description, tag) => {
    
    
    
    /*API call */
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODUxMjg1MzIwNmUwMzNhNDkxOTAxIn0sImlhdCI6MTYzNDIyNjQ5Mn0.dC4m-m79UqUcCOGgHNcw2g1iT7oPt0goCInlWAQfrl8'

      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json();
    

    
    //Adding a new node
    
    setnotes(notes.concat(note));
  }



  //Delete a note
  const deleteNote = async(id) => {
    

    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODUxMjg1MzIwNmUwMzNhNDkxOTAxIn0sImlhdCI6MTYzNDIyNjQ5Mn0.dC4m-m79UqUcCOGgHNcw2g1iT7oPt0goCInlWAQfrl8'

      },
      
    });
    const json = await response.json();
    console.log(json);

   //Deleting note from interface
    console.log("Dlete the note with id" + id);
    const newNote = notes.filter((note) => { return note._id !== id })
    setnotes(newNote);


  }











  //Edit a note
  const editNote =async (id, title, description, tag) => {

    /*API call */
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ODUxMjg1MzIwNmUwMzNhNDkxOTAxIn0sImlhdCI6MTYzNDIyNjQ5Mn0.dC4m-m79UqUcCOGgHNcw2g1iT7oPt0goCInlWAQfrl8'

      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json();
    console.log(json);


 //Making a new note to warp the values into JSON

 let newNotes=JSON.parse(JSON.stringify(notes));

    //Logic for edit a client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    setnotes(newNotes);
  }

  return (

    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}

    </NoteContext.Provider>

  )


}
export default NoteState;
