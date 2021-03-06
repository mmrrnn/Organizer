import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Notifications from './Notifications';
import { SearchBar } from './SearchBar';
import ProjectList from '../projects/ProjectList';

const Dashboard = ({ projects, auth, notifications, firestore }) => {
    const [searchedText, setSearchedText] = useState('');

    if (!auth.uid) return <Redirect to='/signin' />

    return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m6">
                    <SearchBar onChange={text => setSearchedText(text)} />
                    <ProjectList projects={projects} searchedText={searchedText} />
                </div>
                <div className="col s12 m5 offset-m1">
                    <Notifications notifications={notifications} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
})

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'projects', orderBy: ['createdAt', 'desc'] },
        { collection: 'notifications', limit: 5, orderBy: ['time', 'desc'] }
    ])
)(Dashboard);