import React from 'react'
import Logo from '../images/logo.png'
import { Link } from 'react-router-dom'

const header = () => {
  const reloadPage = () => {
    window.location.reload();
}

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo">
          <img src={Logo} className='img' alt="" onClick={reloadPage}/>
        </Link>
        <Link to="/create" className='nav__create'>Create Note</Link>
      </div>
    </nav>
  )
}

export default header
