import React from 'react'
import Connect from './ConnectWallet'

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">Liquifi</div>
        <Connect />
        <ul>
          <li>About </li>
          <li>Features </li>
          <li>Testimonials</li>
        </ul>
        <div className="cta">
          <button>Sign Up</button>
          <button>Log In</button>
        </div>
      </nav>
    </header>
  )
}

export default Header
