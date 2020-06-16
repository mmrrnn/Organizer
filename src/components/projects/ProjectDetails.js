import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import moment from 'moment';
import { deleteProject } from '../../store/actions/projectActions';

const ProjectDetails = ({ id, project, auth, deleteProject, history }) => {
    if (!auth.uid) return <Redirect to='/signin' />

    var isOwner = null;
    if (project && auth) isOwner = (project.authorId === auth.uid)

    const handleDelete = () => {
        deleteProject(id);
        history.push('/');
    }

    if (project) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    {isOwner && (<a className="btn-floating project-button right waves-effect waves-light red" onClick={handleDelete}>
                        <i className="material-icons">delete</i>
                    </a>)}
                    <Link to={{
                        pathname: '/update/' + id,
                        state: {
                            id,
                            project,
                            auth
                        }
                    }}>
                        {isOwner && (<span className="btn-floating project-button right waves-effect waves-light green">
                            <i className="material-icons">edit</i>
                        </span>)}
                    </Link>
                    <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action lighten-4 grey-text">
                        <div>Posted By {project.authorFirstName} {project.authorLastName}</div>
                        <div>{moment(project.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container center">
            <p>Loading project ...</p>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;

    return {
        id,
        project: project,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = dispatch => ({
    deleteProject: id => dispatch(deleteProject(id))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails);