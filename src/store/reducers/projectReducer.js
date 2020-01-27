const initState = {
    projects: []
}

const projectReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('Created: ', action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('Create project error', action.err);
            return state;
        case 'DELETE_PROJECT':
            console.log('Deleted: ', action.id);
            return state;
        case 'DELETE_PROJECT_ERROR':
            console.log('Delete project error', action.err);
            return state;
        case 'UPDATE_PROJECT':
            console.log('Updated: ', action.id);
            return state;
        case 'UPDATE_PROJECT_ERROR':
            console.log('Update project error', action.err);
            return state;
        default:
            return state;
    }
}

export default projectReducer;