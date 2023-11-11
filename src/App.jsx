import React, { useState } from 'react';
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from './components/SelectedProject';

function App() {
  const[projectsState,setProjectsState]=useState({ selectedProjectId:undefined,projects:[],tasks:[] });
  const handleAddTask=(text)=>{
    setProjectsState(prevState=>{
      const newTask={
        text:text,projectId:prevState.selectedProjectId,id:Math.random()
      }
      return{...prevState,tasks:[newTask,...prevState.tasks]}
    })
  }
  const handleDeleteTask=(id)=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        tasks:prevState.tasks.filter((task)=> task.id!==id)
      }
    })
  }
  const handleSelectProject=(id)=>{
    setProjectsState((prevState)=>{
      return{
        ...prevState,selectedProjectId:id,
      }
    })
  }

  const handleStartAddProject=()=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:null,
      }
    })
  }
  const handleCancelAddProject=()=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
      }
    })
  }
  const handleAddProject=(projectData)=>{
    setProjectsState(prevState=>{
      const newProject={
        ...projectData,id:Math.random()
      }
      return{...prevState,selectedProjectId:undefined,projects:[...prevState.projects, newProject]}
    })
  }
  const handleDeleteProject=()=>{
    setProjectsState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:prevState.projects.filter((project)=> project.id!==prevState.selectedProjectId)
      }
    })
  }
  const selectedProject=projectsState.projects.find(project=> project.id===projectsState.selectedProjectId);
  let content=<SelectedProject tasks={projectsState.tasks} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} project={selectedProject} onDelete={handleDeleteProject}/>;
  if(projectsState.selectedProjectId===null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }
  else if(projectsState.selectedProjectId===undefined){
    content=<NoProjectSelected onStartAddProject={handleStartAddProject}/>
  }

  return (
    <div>
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar  onSelectProject={handleSelectProject} onStartAddProject={handleStartAddProject} projects={projectsState.projects} selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
    </div>
  );
}

export default App;
