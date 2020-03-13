//Dependencies
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//Routers
const projectRouters = require("./data/routers/project-routers");
const actionRouters = require("./data/routers/action-routers");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(projectRouters);
server.use(actionRouters);

server.get("*", (req, res) => {
  res.status(404).json("Page not found");
});

server.use((req, res) => {
  res.json("This API is UP");
});

module.exports = server;
