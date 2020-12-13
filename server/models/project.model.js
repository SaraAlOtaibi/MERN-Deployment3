const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name can't be empty"],
    minlength: [3, 'Project name should be 3 characters or longer'],
    /* validate: {
      validator: function(v, cb) {
        this.find({name: v}, function(err,docs){
            cb(docs.length == 0);
        });
      },
      message: 'User already exists!'
    }*/ 

  },
  status: { 
    type: String 
  },
  dueDate: { 
    type: Date,
    required: [true, "Project's due date can't be empty"]
},
}, { timestamps: true });

module.exports.Project = mongoose.model('Project', ProjectSchema);