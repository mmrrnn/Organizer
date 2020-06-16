import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createProject } from '../../store/actions/projectActions';

const CreateProject = ({ auth, createProject, history }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        createProject({
            title,
            content
        });

        history.push('/');
    }

    if (!auth.uid) return <Redirect to='/signin' />

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h5 className="grey-text text-darken-3">Create New Project</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" required onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="input-field">
                    <label htmlFor="content">Project Content</label>
                    <textarea id="content" required className="materialize-textarea" onChange={e => setContent(e.target.value)}></textarea>
                </div>
                <div className="input-field">
                    <button className="btn pink lighten-1 z-depth-0">Create</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.firebase.auth
})

const mapDispatchToProps = dispatch => ({
    createProject: project => dispatch(createProject(project))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);