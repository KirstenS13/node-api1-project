// nodemon is a utility that automatically restarts your server when changes are made
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
    res.json(users)
});

// get user by id

// create a new user

// delete a user

// update a user

// server endpoints end here //

// starts the server
server.listen(8080, () => {
    console.log("Server listening on port 8080");
});