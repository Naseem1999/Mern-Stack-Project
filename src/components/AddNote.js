import React,{useContext,useState}from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote = (props) => {
    const context=useContext(noteContext);
    const{addNote}=context;
    const [note,setNote]=useState({title:"", description:"", tag:""})

    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"", tag:""})
        props.showAlert("Added  successfully","success");
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name] :e.target.value})
    }
  return (
    <div>
       <div className="container ">
        <h1>Add a Note</h1>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title'  value={note.title} aria-describedby="emailHelp" onChange={onchange} minLength={5}  required/>
           
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description'  value={note.description} onChange={onchange} minLength={5}  required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" className="form-control" id="tag" name='tag'  onChange={onchange} minLength={5}  required/>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5 } type="submit" value={note.tag} className="btn btn-primary" onClick={handleclick}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
