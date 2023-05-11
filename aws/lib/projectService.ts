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
    }

    
};
