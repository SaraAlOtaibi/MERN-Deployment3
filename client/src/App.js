import './App.css';
import React, {useState,useEffect} from 'react';
import { Router, Link, navigate} from '@reach/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import AllProjects from './components/AllProjects';
import AddProject from './components/AddProject';


function App() {

  return (
    <div className='container'>
      <h1 className='text-center'> Project Manager</h1> 
      <Router>
        <AllProjects path='/'/>
        <AddProject path='/api/projects/new'/>
      </Router> 
    </div>
  );
}

export default App;
