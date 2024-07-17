import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import noteCRUDservices from '../services/Crudservices'
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";


const Notecard = ({ noteObj }) => {
  const navigate = useNavigate();
  const [updatedNoteObj, setUpdatedNoteObj] = useState(noteObj);      //copying initial data


  // Trimming the title and body 
  const shortTitle = noteObj.title;
  const note_Title = shortTitle.length > 15 ? shortTitle.substring(0, 15) + '...' : shortTitle;
  const bodyParagraph = noteObj.body;
  const descrpition = bodyParagraph.length > 120 ? bodyParagraph.substring(0, 120) + ' ...' : bodyParagraph;

  //returns date.seconds in formatted string
  const formatDate = (dateSeconds) => {
    const MonthArr = ['Jan', 'Feb', 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"];
    const date = new Date(dateSeconds * 1000);
    const dateNum = date.getDate();
    const MonthNum = date.getMonth();
    const Year = date.getFullYear();
    return `${dateNum} ${MonthArr[MonthNum]}, ${Year}`;

  }

  // deleting the note from home page itself
  const deleteNote = async (noteId) => {
    try {
      await noteCRUDservices.deleteNote(noteId);
      toast.success("Note Deleted...", { autoClose: 1000 });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error(error);
    }
  }

  //handling pin from home page itself
  const handlePin = async (e) => {
    await setUpdatedNoteObj({ ...updatedNoteObj, isPinned: e });
    window.location.reload();
  }

  //reflecting changes after handling pin
  useEffect(() => {
    async function updateNote() {
      if (updatedNoteObj?.title === "") {
        toast.error("Title can't be blank");
      } else {
        try {
          await noteCRUDservices.updateNote(noteObj.id, updatedNoteObj);
        } catch (error) {
          toast.error(error);
        }
      }
    }
    updateNote();
  }, [updatedNoteObj])

  return (
    <div id='Notecard' style={{ background: `linear-gradient(45deg, ${noteObj.noteColor}, ${noteObj.noteColor + 'B3'})` }}>
      <div style={{ display: "flex" }}>
        <div id='noteContent' onClick={() => { navigate(`/read/${noteObj.id}`) }}>
          <h1 id="noteTitle" style={{ color: noteObj.textColor }}>{note_Title}</h1>
          <p id="noteTagline" style={{ color: noteObj.textColor }}>{noteObj.tagline}</p>
          <p id="noteBody" >{descrpition}</p>
        </div>
        <div id="notePinsec" className='NoteOptionsIcons'>
          {updatedNoteObj.isPinned === true ?
            <a title='Unpin' onClick={() => { handlePin(false) }}><img src="https://cdn-icons-png.flaticon.com/512/2951/2951513.png" alt="pinned" className='notePin' /></a>
            : <a title='Pin' onClick={() => { handlePin(true) }}><img src="https://cdn-icons-png.flaticon.com/512/2951/2951412.png" alt="notPinned" className='notePin' /></a>}
        </div>
      </div>
      
      <div id="noteOptions">
        <a title='Edit' style={{ background: "white", borderRadius: "100px" }} onClick={() => { navigate(`/update/${noteObj.id}`) }}><MdOutlineEdit alt="edit" className='NoteOptionsIcons' /></a>

        <a title='Delete' style={{ background: "white", borderRadius: "100px" }} onClick={() => deleteNote(noteObj.id)}>
          <RiDeleteBin6Line alt="delete" className='NoteOptionsIcons delete' /></a>
      </div>

      <div id='noteDate' style={{ color: noteObj.textColor }}>{formatDate(noteObj.date.seconds)}</div>
    </div>
  )
}

export default Notecard
