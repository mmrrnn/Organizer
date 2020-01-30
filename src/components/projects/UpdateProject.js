import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { updateProject } from '../../store/actions/projectActions';

const UpdateProject = ({ history, location, updateProject }) => {
    const { id, project, auth } = location.state;
    const [title, setTitle] = useState(project.title)
    const [content, setContent] = useState(project.content);

    if (!auth.uid) return <Redirect to='/signin' />
    
    const handleSubmit = e => {
        e.preventDefault();

        updateProject(id, { title, content });
        history.push('/');
    }

    if (project) {
        return (
            <div className="container">
                <form className="white" onSubmit={handleSubmit}>
                    <h5 className="grey-text text-darken-3">Update Project</h5>
                    <div className="input-field">
                        <label htmlFor="title" className="active">Title</label>
                        <input type="text" id="title" onChange={e => setTitle(e.target.value)} defaultValue={title} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content" className="active">Project Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={e => setContent(e.target.value)} defaultValue={content}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn purple lighten-1 z-depth-0">Update</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="container center">
            <p>Loading project ...</p>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    updateProject: (id, updates) => dispatch(updateProject(id, updates))
})

export default compose(
    connect(null, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(UpdateProject);