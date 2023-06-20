import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';

import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
export default function Notes(props) {

  const context = useContext(noteContext);
  const { notes, getNote,editnote } = context;
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
       getNote()
    }else{
    navigate('/login',{replace:true})
    }
   
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refclose=useRef(null);
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" })  
  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id , etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
   
  } 
  const handleclick = (e) => {
     
    editnote(note.id,note.etitle,note.edescription,note.etag);
   refclose.current.click();
   props.showAlert("Updated successfully","success");
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <AddNote showAlert={props.showAlert} />


      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange}  minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' onChange={onchange} value={note.etag} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5 } type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 ">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert}/>
        })}
      </div>
    </div>
  )
}
