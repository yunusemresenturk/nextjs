import { useState } from 'react';

type Project = {
  id: number;
  name: string;
  description: string;
};

const ProjectList = ({ projects }: { projects: Project[] }) => (
  <ul>
    {projects.map((project) => (
      <li key =
        {project.id}>
        {project.name}
        {project.description}
      </li>
    ))}
  </ul>
);

const AddProject = ({ addProject }: { addProject: (project: Project) => void }) => {
  const [newProject, setNewProject] = useState<Project>(
    {
      id: 0,
      name: '',
      description: ''
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({ 
      id: newProject.id + 1, 
      name: '', 
      description: '',
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newProject.name}
        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        placeholder="Enter project name"
      />
      <input
        type="text"
        value={newProject.description}
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        placeholder="Enter project description"
      />

      <button type="submit">Create Project</button>
    </form>
  );
};

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return (
    <div>
      <h1>Project Management</h1>
      <ProjectList projects={projects} />
      <AddProject addProject={addProject} />
    </div>
  );
};

export default Home;
