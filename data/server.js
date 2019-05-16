const express = require("express"); //commonJS syntax
//equivalent to import express from 'express'

const db = require("./hubs-model.js");

const server = express(); //this creates http web server

//Endpoints
//introduce 'routing' and explain how request are routed to the correct
// 'request handler function'  based on the URL and HTTP verb on the request.
//Explain what 'req' and 'res' are.

server.get("/now", (req, res) => {
  // name is not important (could be request, respond) position is

  const now = new Date().toISOString();
  res.send(now);
});

server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => res.status(200).json(hubs))
    .catch(err => res.status(500).json({ success: false, err }));
}); //must define route first

//CRUD = create update delete

server.post("/hubs", (req, res) => {
  // one way a client can send information is in the request body
  const hubInfo = req.body;

  console.log({ hubInfo });

  db.add(hubInfo)
    .then(hub => res.status(201).json(hub))
    .catch(err => res.status(500).json({ success: false, err }));
});

//DELETE
server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({
          success: false,
          message: "I can not find the hub you are looking for"
        });
      }
    })
    .catch();
});

// UPDATE

server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({
          success: false,
          message: "I cannot find the hub you are looking for"
        });
      }
    })
    .catch(err => res.status(500).json({ success: false, err }));
});

// post - for create endpoint

// server.listen(4000, () =>
//     console.log(`\n*** Server running on http://localhost:4000***\n`)
// );

//listening port

module.exports = server;
