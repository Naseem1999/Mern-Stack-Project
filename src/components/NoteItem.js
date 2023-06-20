import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
const NoteItem = (props) => {
    const{note,updatenote}=props;
    const context=useContext(noteContext);
    const{deletenote}=context;
    
  return (
    <div className='col-md-3 my-3'>
   
      <div className="card" >

  <div className="card-body">
    <div className="d-flex align-items-center">
      <h5 className="card-title">{note.title}</h5>
      <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletenote(note._id); props.showAlert("deleted successfully","success");}}></i>
      <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>

    </div>
    <p className="card-text">{note.description}</p>
    
  </div>
</div>
    </div>
  )
}

export default NoteItem
