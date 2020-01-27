import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/signup">SIGN UP</NavLink></li>
            <li><NavLink to="/signin">LOG IN</NavLink></li>
        </ul>
    );
}

export default SignedOutLinks;
