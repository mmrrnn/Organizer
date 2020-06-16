import React from 'react';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

function Navbar({ auth, profile }) {
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    
    return (
        <nav>
            <div className="nav-wrapper white">
                { links }
            </div>
        </nav>
    )
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
})

export default connect(mapStateToProps)(Navbar);