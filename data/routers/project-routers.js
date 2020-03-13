const express = require("express");
const router = express.Router();
const projects = require("../helpers/projectModel");

router.get("/api/projects", (req, res) => {
  projects
    .get(req.body.id)
    .then(post => {
      if (post === null) {
        res.status(404).json({ message: "There is no project with this id" });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "An error occurred collecting the data" });
    });
});

router.get("api/projects/:id/actions", (req, res) => {
  const { id } = re.params;
  projects
    .get(req.params.id)
    .then(post => {
      if (post === null) {
        res.status(404).json({ message: "There isn't a project with this id" });
      } else {
        projects
          .getProjectActions(req.params.id)
          .then(actions => {
            if (actions.length === 0) {
              res
                .status(200)
                .json({ message: "There isn't a project with this id" });
            } else {
              res.status(200).json(actions);
            }
          })
          .catch(error => {
            res
              .status(500)
              .json({ message: "There was an error collecting action data" });
          });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error collecting action data" });
    });
});

router.post("/api/projects", (req, res) => {
  const { name, description } = req.body;
  if (req.body.name && req.body.description) {
    projects
      .insert(req.body)
      .then(post => {
        res
          .status(201)
          .json({ message: "The Post has bee successfully created." });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide a name and a description for your new post"
    });
  }
});

router.delete("/api/projects/:id", (req, res) => {
  const { id } = req.params;
  projects
    .remove(req.params.id)
    .then(code => {
      if (code === undefined) {
        res
          .status(202)
          .json({ message: "The project has been successfully deleted" });
      } else {
        res.status(404).json({ message: "There isn't a project with this id" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error deleting this project" });
    });
});

router.put("/api/projects", (req, res) => {
  const { id, name, description } = req.body;
  if (req.body.id && req.body.name && req.body.description) {
    projects
      .get(req.body.id)
      .then(post => {
        if (post === 0) {
          res
            .status(404)
            .json({ message: "There isn't a project with this id" });
        } else {
          projects
            .update(req.body.id, req.body)
            .then(updated => {
              res.status(202).json(updated);
            })
            .catch(error => {
              res
                .status(500)
                .json({ message: "There was an error updating this project" });
            });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "An error occurred collecting the data" });
      });
  } else {
    res.status(400).json({
      message:
        "Provide please a post id with the changes, including: the name and the description of your post"
    });
  }
});

//custom middleware
function validateProjectData(req,res,next){
    projects.getById(req.params.id)
    .then((project)=>{
      if(project){
        req.project =project
        next()
      }else{
        res.status(400).json({message:"invalid project id"})
      }
    })
    .catch(error =>{
      next(error)
    })
   
   }
   
   function validateProject(req,res,next){
     if(!req.body){
       res.status(400).json({message:"missing project info"});
     }else if(!req.body.text){
       res.status(400).json({message:"project field is required"})
     }else{
       next();
     }
   }
   
   module.exports = router;
   
