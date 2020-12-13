const ProjectController = require('../controllers/project.controller');

module.exports = function(app){

    app.post('/api/projects/create', ProjectController.createNewProject);
    app.get('/api/projects', ProjectController.getAllProjects);
    app.get('/api/projects/:_id', ProjectController.getOne);
    app.put('/api/projects/:_id/edit', ProjectController.update);
    app.delete('/api/projects/:_id/delete', ProjectController.delete);
}
