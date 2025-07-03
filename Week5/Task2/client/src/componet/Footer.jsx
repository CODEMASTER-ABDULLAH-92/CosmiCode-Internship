import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer className="bg-gray-800 text-white text-center p-4 mt-8">
      <p>&copy; {new Date().getFullYear()} Post App. All rights reserved.</p>
    </footer>
    </div>
  )
}

export default Footer
