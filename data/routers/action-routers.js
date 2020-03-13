const express = require("express");
const router = express.Router();

const actions = require("../helpers/actionModel");

router.get("/api/actions", (req, res) => {
  const { id } = req.body;
  actions
    .get(req.body.id)
    .then(action => {
      if (action === null) {
        res
          .status(404)
          .json({ message: "There is not an action with this id" });
      } else {
        res.status(200).json(action);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error collecting data actions" });
    });
});

router.post("/api/actions", (req, res) => {
  const { project_id, description, notes } = req.body;
  if (req.body.project_id && req.body.description && req.body.notes) {
    actions
      .insert(req.body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        res.status(500).json({ message: "error" });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide the relevant project id, an action description and notes for your new actions"
    });
  }
});

router.delete("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(req.params.id)
    .then(code => {
      if (code === 1) {
        res.status(200).json({ message: "This actions has been deleted" });
      } else {
        res.status(404).json({ message: "This id has not any action" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "An error occurred deleting this action" });
    });
});

router.put("api/actions", (req, res) => {
  const { id, project_id, description, notes, completed } = req.body;
  if (
    (req.body,
    id &&
      req.body.project_id &&
      req.body.description &&
      req.body.notes &&
      req.body.completed)
  ) {
    actions
      .get(req.body.id)
      .then(action => {
        if (action === null) {
          res
            .status(404)
            .json({ message: "There isn't an action with this id" });
        } else {
          actions
            .update(req.body.id, req.body)
            .then(action => {
              res.status(200).json(action);
            })
            .catch(error => {
              res
                .status(500)
                .json({ message: "There was an error updating this action" });
            });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ message: "There was an error collecting actions data" });
      });
  } else {
    res.status(400).json({
      message:
        "Provide please a post id with the changes, including: the name and the description of your post and completed status for your action"
    });
  }
});

//custom middleware
function validateActionId(req, res, next) {
  const { id } = req.params;
  actions
    .getById(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: "There is no action to the id" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "An action error occurred" });
    });
}
function validateAction(req, res, next) {
  if (!req.body.action) {
    res.status(400).json({ message: "The required action is missing" });
  } else if (isNaN(req.body.action)) {
    res.status(400).json({ message: "That action can not be complete" });
  } else {
    next();
  }
}

module.exports = router;
