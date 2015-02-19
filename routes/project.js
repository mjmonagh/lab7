var models = require('../models');

exports.projectInfo = function(req, res) {
  var projectID = req.params.id;

  models.Project
        .find({ "_id": projectID })
        .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var newProject = new models.Project(form_data);

  newProject.save(afterSaving);

  function afterSaving(err) {
    if(err) console.log(err);
    res.send("OK");
    res.redirect('/'); 
  }

}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
        .find({ "_id": projectID })
        .remove()
        .exec(afterRemoving);

  function afterRemoving(err) {
    if(err) console.log(err);
    res.send("OK");
  }
  // YOU MUST send an OK response w/ res.send();
}