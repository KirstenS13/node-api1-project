// nodemon is a utility that automatically restarts your server when changes are made
// note: in package.json under "scripts", it should be "server": "nodemon the-name-of-the-file-that-has-server.listen-in-it"

// import express from node_modules
const express = require("express");

// import the "fake" database you made in a separate file
const db = require("./database");

// create server using express
const server = express();

// install middleware to help parse JSON request bodies
server.use(express.json());

// server endpoints go here // - eg all the get, post, delete, etc

// sends back a message to confirm the server works
server.get("/", (req, res) => {
    res.json({ message: "Hello, this is the server" });
});

// get all users
server.get("/api/users", (req, res) => {
    // grabs the users from the database
    const users = db.getUsers();

    // sends the users back in the response object
    res.json(users);
});

// get user by id
server.get("/api/users/:id", (req, res) => {
    // grab the id from the request object
    const id = req.params.id;

    // grab the user by passing getUserById the id
    const user = db.getUserById(id);

    // send the user back in the response object IF THE ID EXISTS
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "That is not a valid id", attemptedId: id });
    };
});

// create a new user

// delete a user

// update a user

// server endpoints end here //

// starts the server
server.listen(8080, () => {
    console.log("Server listening on port 8080");
});