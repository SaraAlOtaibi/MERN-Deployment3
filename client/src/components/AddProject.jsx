import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Router, Link, navigate } from '@reach/router';


const AddProject = () => {

  const [name, setName] = useState('');
  const [status, setStatus] = useState('backlog');
  const [dueDate, setDueDate] = useState();
  const [errors, setErrors] = useState({});

  const onSubmitHandler = e => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/projects/create", {name, status, dueDate} )
      .then(res => {
        console.log(res);
        //props.successCallback();
        if(res.data.error) {
          setErrors(res.data.error.errors);
          console.log(res.data.error.errors)
        } else {
          navigate("/");
          console.log('i am heeereee')
        }
      }).catch(err => {
        console.error(err);
        //setErrors(err.data.error.errors);
      });
  }


  return (
    <div className='row'>
      <div className='col justify-content-center'>
        <div className='text-right'> <Link to='/'> Back to Dashboard </Link> </div>
        <div> 
        <fieldset className="border p-5">
          <legend  className="w-auto">Plan new Project</legend>
          <form onSubmit={onSubmitHandler} className='form-horizontal' >
            <div className='form-group row'>
            <label className="col-sm-2 col-form-label"> Project </label>
            <div className="col-sm-10">
            <input type="text" className="form-control" 
            name='name'
            
            onChange = { e => setName(e.target.value) } />
            <p className='text-danger'> { errors.name ? errors.name.message : '' } </p>
            </div>
            
            </div> 
            <div className='form-group row'>
            <label className="col-sm-2 col-form-label">Due Date</label>
            <div className="col-sm-10">
            <input 
            type="date" className="form-control"
            name="dueDate"
            onChange = { e => setDueDate(e.target.value) } 
            ></input>
            <p className='text-danger'> { errors.dueDate ? errors.dueDate.message : '' } </p>
            </div>
            
            <input type="submit" className="btn btn-primary btn-block" value='Plan Project'/>

            </div>
        </form>
        </fieldset>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
