import React from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
  return (
   <header>
    <div>
        <Link to="/">
            <h1>EDU</h1>
        </Link>
        <nav>
            <Link to="">EDU</Link>
            <Link to="">Educations</Link>
            <Link to="">Library</Link>
            <Link to="">My educations</Link>
            <Link to="">Logout</Link>
            <div>Profile</div>
        </nav>
    </div>
   </header>
  )
}

export default DashHeader
