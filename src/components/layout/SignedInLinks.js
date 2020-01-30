import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from './../../store/actions/authActions';

const SignedInLinks = ({ profile, signOut }) => {
    return (
        <ul className="right">
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/create">NEW PROJECT</NavLink></li>
            <li><a onClick={signOut}>LOG OUT</a></li>
            <li><NavLink to="/" className="btn btn-floating yellow purple-text">{profile.initials}</NavLink></li>
        </ul>
    );
}

const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut())
})

export default connect(null, mapDispatchToProps)(SignedInLinks);