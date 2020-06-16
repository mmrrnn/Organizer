import * as React from 'react';
import { Link } from 'react-router-dom';
import ProjectSummary from './ProjectSummary';

const ProjectList = ({ projects, searchedText }) => {
    return (
        <div className="project-list section">
            {projects && projects.map(project => {
                if (project.title.indexOf(searchedText) !== -1 || project.content.indexOf(searchedText) !== -1) {
                    return (
                        <Link to={'/project/' + project.id} key={project.id} >
                            <ProjectSummary project={project} />
                        </Link>
                    )
                }

                return null;
            })}
        </div>
    );
}

export default ProjectList;