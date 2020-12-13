import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Router, Link, navigate } from '@reach/router';
import moment from 'moment';


const AllProjects = () => {

  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    axios.get("http://localhost:8000/api/projects")
      .then(res => {
        console.log(res.data);
        console.log('hi');
        //res.data.slice().sort((a, b) => b.date - a.date)
        setProjects(res.data);
        setLoaded(true);
      }).catch(err => console.error(err));
  }

  function changeStatus(_id, status){
    axios.put(`http://localhost:8000/api/projects/${_id}/edit`, {'status': status} )
    .then(res => {
      console.log(res.data);
      getAll();
      //setLoaded(true);
    }).catch(err => console.error(err));
  }

  function removeProject(_id){
    axios.delete(`http://localhost:8000/api/projects/${_id}/delete`)
      .then(res => {
        console.log(res);
        getAll();
      })
  }

  function checkPast(due_date){
    var now = new Date();
    now.setHours(0,0,0,0);
    console.log(due_date);
    console.log(now);
    if (due_date < now) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div>
      {
        loaded && <> 
        <div className='row'>
          <div className='col overflow-auto border m-3 p-3' style={{height : '600px' }} >
            <h3 className='border text-center bg-primary p-3'> Backlog </h3> 
            { 

              projects.filter(project => project.status==='backlog')
              .map( (project,i) => 
              <div key={i} className='border m-3 p-3'> 
                <h5> {project.name} </h5>
                <p className={checkPast(project.dueDate) ? 'text-danger':''}> Due:  { moment(project.dueDate).format('MM/DD/YYYY') }  </p>
                <button className='btn btn-warning btn-block' onClick={e=> changeStatus(project._id, 'in progress')}> Start Project </button> 
              </div>)
            }
          </div>
          <div className='col overflow-auto border m-3 p-3' style={{height : '600px' }}>
            <h3 className='border text-center bg-warning p-3'> In Progress </h3> 
            {
              projects.filter(project => project.status==='in progress')
              .map( (project,i) => 
              <div key={i} className='border m-3 p-3'> 
                <h5> {project.name} </h5>
                <p> Due: 
                { moment(project.dueDate).format('MM/DD/YYYY') } 
                </p>
                <button className='btn btn-success btn-block' onClick={e=> changeStatus(project._id, 'completed')} > Move to Completed </button> 
              </div>)
            }
          </div>
          <div className='col overflow-auto border m-3 p-3' style={{height : '600px' }}>
            <h3 className='border text-center bg-success p-3'> Completed </h3> 
            {
              projects.filter(project => project.status==='completed')
              .map( (project,i) => 
              <div key={i} className='border m-3 p-3'> 
                <h5> {project.name} </h5>
                <p> Due: { moment(project.dueDate).format('MM/DD/YYYY') }  </p>
                <button className='btn btn-danger btn-block' onClick={e=> removeProject(project._id)} > Remove Project </button> 
              </div>)
            }
          </div>
        </div>
        </>
      }
      <div className='row'>
          <button className='btn btn-primary btn-block' onClick={e => navigate('api/projects/new')} > Add New Project </button>
      </div> 
    </div>
  );
}

export default AllProjects;
