import React from 'react'
import {Link} from 'react-router-dom'
const Footer = () => {
 let date = new Date();
    return (

    <div>
      <p className='text-gray-400 text-center py-10'>&copy;  {date.getFullYear()} <Link to="/" className='text-green-500'>Thinkpad</Link>, All rights are reserved</p>
    </div>
  )
}

export default Footer
