import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/posts/add'>Create post</Link>
        </div>
    )
}

export default Navbar;