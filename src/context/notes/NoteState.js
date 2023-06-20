import React from "react";
import { useState } from "react";


import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host="http://localhost:5000";
  const notesinitial=[]
 
   const[notes,setNotes]=useState(notesinitial);
   //get Notes
   const getNote = async() => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      
      headers: {
        "Content-Type": "application/json",
         "auth-token":localStorage.getItem('token')
      },
      
     
    });
    const json=await response.json();
    // console.log(json);
    setNotes(json);
    
  }
//Add note
  const addNote= async(title,description,tag)=>{

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", 
      
      headers: {
        "Content-Type": "application/json",
         "auth-token":localStorage.getItem('token')   
      },
      
      body: JSON.stringify({title,description,tag}), 
    });
    const note= await response.json();
   
    setNotes(notes.concat(note))
  }
//delete note
  const deletenote=async(id)=>{

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      
      headers: {
        "Content-Type": "application/json",
         "auth-token":localStorage.getItem('token')
      },
      
     
    });
    const json= await response.json();    
    console.log(json);
     console.log("deleting a Note"+id)
     const newnotes=notes.filter((note)=>note._id!==id);
     setNotes(newnotes);
  }
//edit note
  const editnote= async(id,title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", 
      
      headers: {
        "Content-Type": "application/json",
         "auth-token":localStorage.getItem('token')
      },
      
      body: JSON.stringify({title,description,tag}), 
    });
    const json=  await response.json();

    console.log(json);

    let newnotes=JSON.parse(JSON.stringify(notes));
  
    
     for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if(element._id===id){
        newnotes[index].title=title;
        newnotes[index].description=description;
        newnotes[index].tag=tag;
        break;
      }
      
     }
     setNotes(newnotes);
  }

  return (
    <NoteContext.Provider value={{notes ,setNotes,addNote ,deletenote,editnote ,getNote}}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;