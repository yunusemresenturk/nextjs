import { Demo } from '../../types/types';

export const ProjectService = {

    getProjects() {
        return fetch('/project', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Project[]);
    },

    getProject(id: string) {
        return fetch(`/project/${id}`, { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Project);
    },

    deleteProject(id: string) {
        return fetch(`/project/${id}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Project);
    },

    createProject(project: Demo.Project) {
        return fetch('/project', {
            method: 'POST',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Project);
    },

    updateProject(project: Demo.Project) {
        return fetch(`/project/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Project);
    }
    
};
