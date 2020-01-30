import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions';

const SignUp = ({ auth, authError, signUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        signUp({
            email,
            password,
            firstName,
            lastName
        })
    }

    if (auth.uid) return <Redirect to='/' />;

    return (
        <div className="container">
            <form className="white" onSubmit={handleSubmit}>
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="input-field">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="input-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="input-field">
                    <button className="btn purple lighten-1 z-depth-0">Sign Up</button>
                    <div className="red-text center">
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </div>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    authError: state.auth.authError
})

const mapDispatchToProps = dispatch => ({
    signUp: newUser => dispatch(signUp(newUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);