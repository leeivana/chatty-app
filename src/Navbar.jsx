import React from 'react';

const Navbar = ({ numOfUsers }) => {
  return (
    <nav className="navbar"><a href="/" className="navbar-brand">Chatty</a>
    <small className='counter'>{numOfUsers} User(s) Online </small>
    </nav>
  );
}

export default Navbar;