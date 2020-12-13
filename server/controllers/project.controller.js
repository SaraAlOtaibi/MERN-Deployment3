const { Project } = require('../models/project.model');

class ProjectController {

  getAllProjects(req, res) {
    // how we structure our res.json will be how it looks in the front-end

    Project.find({}).sort({ dueDate: 1 })
      .then(items => res.json(items))
      .catch(err => res.json(err));
  }

    /* createNewProject = (req, res) => {
    Project.create(req.body)
      .then(newlyCreatedItem => res.json({ newProject: newlyCreatedItem }))
      .catch(err => res.json({ message: "Something went wrong", error: err }));
  }; */ 

  createNewProject(req, res){
    // first make sure the review and name aren't already in use
    //Project.findOne({ _id: req.params })
      //.then(project => {
        // did the reviewer alredy leave a review?
        let exists = false;
        //var projects;
        Project.find({})
        .then(projects =>{for (let project of projects) {
          if (project.name.toLowerCase() === req.body.name.toLowerCase()) {
            exists = true;
            break;
          }
        }
        if (exists) {

          res.json({
            error: {
            errors: {
                name: {
                    message:`The project name [ ${req.body.name.toLowerCase()} ] is already exist!`
                }
            }
          }
        });
        } else { 
          Project.create(req.body)
          .then(newlyCreatedItem => res.json({ newProject: newlyCreatedItem }))
          .catch(err => res.json({ message: "Something went wrong", error: err }));
            }
          })
        .catch(err => res.json(err));
        
      //}).catch(err => res.json(err));
  } 

  getOne(req, res) {
    // getting back one restaurant at a time
    Project.findOne({ _id: req.params._id })
      .then(item => res.json(item))
      .catch(err => res.json(err));
  }


  update(req, res) {
    Project.findByIdAndUpdate({ _id: req.params._id }, req.body, { runValidators: true })
      .then((item) => res.json(item))
      .catch(err => res.json(err));
  }

  delete(req, res) {
    Project.deleteOne({ _id: req.params._id })
      .then(() => res.json({ msg: "ok" }))
      .catch(err => res.json(err));
  }

}

module.exports = new ProjectController();