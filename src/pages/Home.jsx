import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import noteCRUDservices from '../services/Crudservices'
import Notecard from '../components/Notecard';
import Loader from '../components/Loader';

const Home = () => {

  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);   //for storing fetched data from DB

  const [isLoading, setIsLoading] = useState(false);


  //refreshing page to show fetched notes
  useEffect(() => {
    //fetching all notes data from DB
    const fetchAllNotes = async () => {
      setIsLoading(true);
      try {
        const data = await noteCRUDservices.getAllNotes();
        setNotes(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchAllNotes();
  }, [])




  var items = [];    //storing fetched notes in seq purpose
  notes.map(note => { if (note.isPinned === true) items.push(note); })      //pushing pinned notes first
  notes.map(note => { if (note.isPinned === false) items.push(note); })       //pushing unpinned notes later

  //indexes for displaying notes range for particular page
  const [itemsPerPage, setItemsPerPage] = useState(6);    //notes per page
  const [itemOffset, setItemOffset] = useState(0);        //starting index for current page
  var endOffset = itemOffset + itemsPerPage;              //ending index for current page
  var currentItems = items.slice(itemOffset, endOffset);  //notes array for current page
  var pageCount = Math.ceil(items.length / itemsPerPage); //total pages according to notes per pages

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  function Items({ currentItems }) {
    return (
      <>{currentItems &&
        currentItems.map(note => <Notecard noteObj={note} key={note.id} />)
      }</>
    );
  }
  return (
    <section id='Homepage'>
      <h1 id='NotesHead'>NoteBook</h1>

      {/* displaying cards */}
      {isLoading ? <Loader /> :
        <div id="homecards">
          <Items currentItems={currentItems} />
        </div>
      }


      {/* pagination numbers */}
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={1}
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        className='CardNav'
        activeClassName='activePage'
      />

      {/* Create Note Button */}
      <div id="createBtn" onClick={() => { navigate("/create") }}>
        <a title='Create Note'><img src="https://cdn-icons-png.flaticon.com/512/10257/10257707.png" alt="create" /></a>
      </div>
    </section>
  )
}

export default Home
