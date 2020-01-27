import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from './../../store/actions/authActions';

const SignedInLinks = props => {
    return (
        <ul className="right">
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/create">NEW PROJECT</NavLink></li>
            <li><a onClick={props.signOut}>LOG OUT</a></li>
            <li><NavLink to="/" className="btn btn-floating yellow purple-text">{ props.profile.initials }</NavLink></li>
        </ul>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
