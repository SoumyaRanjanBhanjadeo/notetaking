import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const footer = () => {
  return (
    <footer>
      <div className="footer__copyright">
        <small>All Rights Reserved &copy; Copyright, Developed by <Link to='https://soumyaranjanbhanjadeo.netlify.app/' className='name' target='_blank'>SOUMYA RANJAN BHANJADEO</Link></small>
      </div>
    </footer>
  )
}

export default footer
