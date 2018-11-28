import React, {Component} from 'react';

const Navbar = props => {
  return (
    <nav className="navbar"><a href="/" className="navbar-brand">Chatty</a>
    <small className='counter'>{props.numOfUsers} User(s) Online </small>
    </nav>
  );
}

export default Navbar;