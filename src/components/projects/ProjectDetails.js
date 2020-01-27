import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import { deleteProject } from '../../store/actions/projectActions';
import moment from 'moment';

class ProjectDetails extends Component {
    handleDelete = e => {
        const id = this.props.id;

        this.props.deleteProject(id);
        // czemu to sie nie usuwa, dopiero po odswiezeniu 
        // this.forceUpdate();    -------     gowno daje
        this.props.history.push('/');
    }

    render() {
        const { id, project, auth } = this.props;
        var isOwner = null;
        if (!auth.uid) return <Redirect to='/signin' />

        if (project && auth) isOwner = (project.authorId === auth.uid)

        if (project) {
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        {isOwner && (<a className="btn-floating project-button right waves-effect waves-light red" onClick={this.handleDelete}>
                            <i className="material-icons">delete</i>
                        </a>)}
                        <Link to={'/update/' + id} >
                            {isOwner && (<span className="btn-floating project-button right waves-effect waves-light purple">
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
        } else {
            return (
                <div className="container center">
                    <p>Loading project ...</p>
                </div>
            )
        }
    }
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

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: id => dispatch(deleteProject(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(ProjectDetails);
