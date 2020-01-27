import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { updateProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

class UpdateProject extends Component {
    state = {
        title: this.props.project ? this.props.project.title : null,
        content: this.props.project ? this.props.project.content : null
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = e => {
        e.preventDefault();

        const id = this.props.id;

        this.props.updateProject(id, this.state);
        this.props.history.push('/');
    } 
    
    render() {
        const { id, project, auth } = this.props;
        var isOwner = null;

        if (!auth.uid) return <Redirect to='/signin' />
        if (project && auth) isOwner = (project.authorId === auth.uid)

        if(project){
            return (
                <div className="container">
                    <form className="white" onSubmit={this.handleSubmit}>
                        <h5 className="grey-text text-darken-3">Update Project</h5>
                        <div className="input-field">
                            <label htmlFor="title" className="active">Title</label>
                            <input type="text" id="title" onChange={this.handleChange} defaultValue={this.state.title} />
                        </div>
                        <div className="input-field">
                            <label htmlFor="content" className="active">Project Content</label>
                            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} defaultValue={this.state.content}></textarea>
                        </div>
                        <div className="input-field">
                            <button className="btn purple lighten-1 z-depth-0">Update</button>
                        </div>
                    </form>
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
        updateProject: (id, updates) => dispatch(updateProject(id, updates))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'projects' }
    ])
)(UpdateProject);