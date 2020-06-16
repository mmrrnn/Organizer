import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn } from '../../store/actions/authActions';

const SignIn = ({ authError, auth, signIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        signIn({
            email,
            password
        });
    }

    if (auth.uid) return <Redirect to='/' />;

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Log In</button>
                    <div className="red-text center">
                        {authError ? <p>{authError}</p> : null}
                    </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    authError: state.auth.authError,
    auth: state.firebase.auth
})

const mapDispatchToProps = dispatch => ({
    signIn: creds => dispatch(signIn(creds))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);