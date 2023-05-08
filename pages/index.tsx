import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Microservices } from '../aws/lib/microservice';
import { Demo } from '../types/types';

const Crud = () => {
  let emptyProject: Demo.Project = {
    id: '',
    name: '',
    description: '',
    status: '',
  };

  const [projects, setProjects] = useState<Demo.Project[]>([]);
  const [projectDialog, setProjectDialog] = useState(false);
  const [deleteProjectDialog, setDeleteProjectDialog] = useState(false);
  const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false);
  const [project, setProject] = useState<Demo.Project>(emptyProject);
  const [selectedProjects, setSelectedProjects] = useState<Demo.Project[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable<Demo.Project[]>>(null);

  useEffect(() => {
  }, []);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const openNew = () => {
    setProject(emptyProject);
    setSubmitted(false);
    setProjectDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProjectDialog(false);
  };

  const hideDeleteProjectDialog = () => {
    setDeleteProjectDialog(false);
  };

  const hideDeleteProjectsDialog = () => {
    setDeleteProjectsDialog(false);
  };

  const saveProject = () => {
    setSubmitted(true);

    if (project.name.trim()) {
      let _projects = [...projects];
      let _project = { ...project };
      if (project.id) {
        const index = findIndexById(project.id);

        _projects[index] = _project;
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Project Updated', life: 3000 });
      } else {
        _project.id = createId();
        _project.image = 'project-placeholder.svg';
        _projects.push(_project);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Project Created', life: 3000 });
      }

      setProjects(_projects);
      setProjectDialog(false);
      setProject(emptyProject);
    }
  };

  const editProject = (project: Demo.Project) => {
    setProject({ ...project });
    setProjectDialog(true);
  };

  const confirmDeleteProject = (project: Demo.Project) => {
    setProject(project);
    setDeleteProjectDialog(true);
  };

  const deleteProject = () => {
    let _projects = projects.filter((val) => val.id !== project.id);
    setProjects(_projects);
    setDeleteProjectDialog(false);
    setProject(emptyProject);
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
  };

  const findIndexById = (id: string) => {
    let index = -1;
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProjectDialog(true);
  };

  const deleteSelectedProjects = () => {
    let _projects = projects.filter((val) => !selectedProjects?.includes(val));
    setProjects(_projects);
    setDeleteProjectsDialog(false);
    setSelectedProjects([]);
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Projects Deleted', life: 3000 });
  };

  const onStatusChange = (e: RadioButtonChangeEvent) => {
    let _project = { ...project };
    _project['status'] = e.value;
    setProject(_project);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    const val = (e.target && e.target.value) || '';
    let _project = { ...project };
    _project[`${name}`] = val;

    setProject(_project);
  };

  const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
    const val = e.value || 0;
    let _project = { ...project };
    _project[`${name}`] = val;

    setProject(_project);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
          <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProjects || !selectedProjects.length} />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
        <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
      </React.Fragment>
    );
  };


  const nameBodyTemplate = (rowData: Demo.Project) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.name}
      </>
    );
  };


  const statusBodyTemplate = (rowData: Demo.Project) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        {rowData.status}
      </>
    );
  };

  const descriptionBodyTemplate = (rowData: Demo.Project) => {
    return (
      <>
        <span className="p-column-title">Reviews</span>
        {rowData.description}
      </>
    );
  };

  const actionBodyTemplate = (rowData: Demo.Project) => {
    return (
      <>
        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProject(rowData)} />
        <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProject(rowData)} />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Projects</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
      </span>
    </div>
  );

  const projectDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveProject} />
    </>
  );
  const deleteProjectDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProjectDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteProject} />
    </>
  );
  const deleteProjectsDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" text onClick={hideDeleteProjectsDialog} />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProjects} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={projects}
            selection={selectedProjects}
            onSelectionChange={(e) => setSelectedProjects(e.value as Demo.Project[])}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} projects"
            globalFilter={globalFilter}
            emptyMessage="No projects found."
            header={header}
            responsiveLayout="scroll"
          >
            <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
            <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
            <Column field="inventoryDescription" header="Description" body={descriptionBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>
            <Column field="status" header="Status" sortable body={statusBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
          </DataTable>

          <Dialog visible={projectDialog} style={{ width: '450px' }} header="Project Details" modal className="p-fluid" footer={projectDialogFooter} onHide={hideDialog}>
            {project.image && <img src={`/demo/images/project/${project.image}`} alt={project.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={project.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !project.name })} />
              {submitted && !project.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <InputTextarea id="description" value={project.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
            </div>

            <div className="field">
              <label className="mb-3">Status</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton inputId="status1" name="status" value="New" onChange={onStatusChange} checked={project.status === 'New'} />
                  <label htmlFor="status1">New</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton inputId="status2" name="status" value="In Progress" onChange={onStatusChange} checked={project.status === 'In Progress'} />
                  <label htmlFor="status2">In Progress</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton inputId="status3" name="status" value="Completed" onChange={onStatusChange} checked={project.status === 'Completed'} />
                  <label htmlFor="status3">Completed</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton inputId="status4" name="status" value="Cancelled" onChange={onStatusChange} checked={project.status === 'Cancelled'} />
                  <label htmlFor="status4">Cancelled</label>
                </div>
              </div>
            </div>
          </Dialog>

          <Dialog visible={deleteProjectDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProjectDialogFooter} onHide={hideDeleteProjectDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {project && (
                <span>
                  Are you sure you want to delete <b>{project.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog visible={deleteProjectsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProjectsDialogFooter} onHide={hideDeleteProjectsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {project && <span>Are you sure you want to delete the selected projects?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Crud;


// Path: '/crud'