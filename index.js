// nodemon is a utility that automatically restarts your server when changes are made
// note: in package.json under "scripts", it should be "server": "nodemon the-name-of-the-file-that-has-server.listen-in-it"
// NOTE: TO RUN THE SERVER RUN "npm run server"

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
    if (users) {
        res.json(users);
    } else {
        res.status(500).json({ message: "The users information could not be retrieved."});
    }
});

// get user by id
server.get("/api/users/:id", (req, res) => {
    // grab the id from the request object
    const id = req.params.id;

    // grab the user by passing getUserById the id
    const user = db.getUserById(id);

    // grab all users
    const users = db.getUsers();

    // send the user back in the response object IF THE ID EXISTS
    if (user) {
        // send the user back to the client
        res.json(user);
    } else if (!users.includes(user)) {
        // let the client know the user does not exist
        res.status(404).json({ message: "The user with the specified ID does not exist", attemptedId: id });
    } else {
        // let the client know there was a server error
        res.status(500).json({ message: "The user information could not be retrieved."});
    }
});

// create a new user
server.post("/api/users", (req, res) => {
    // make sure name and bio are provided
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user." });
    }
    // grab the new user the database created from the object passed in
    const newUser = db.createUser({ name: req.body.name, bio: req.body.bio });

    // send back the user created
    res.status(201).json({ message: "New user created", newUser: newUser });

    if (!newUser) {
        res.status(500).json({ message: "There was an error while saving the user to the database."});
    }
});

// delete a user
server.delete("/api/users/:id", (req, res) => {
    // grab the id from the url
    const id = req.params.id;

    // grab the user by id
    const user = db.getUserById(id);

    // grab all the users
    const users = db.getUsers();

    // confirm the user exists
    if (user) {
        // delete the user
        db.deleteUser(id);
        // let the client know the user was deleted
        res.status(204).end();
    } else if (!users.includes(user)) {
        // let the client know the user could not be deleted
        res.status(404).json({ message: "The user with the specified ID does not exist", attemptedId: id });
    } else {
        // let the client know there was an error with the server
        res.status(500).json({ message: "The user could not be removed." });
    }
});

// update a user
server.put("/api/users/:id", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user." });
    }
    // grab the id from the url
    const id = req.params.id;

    // grab the user by id from the database to see if they exist
    const user = db.getUserById(id);

    // grab all the users
    const users = db.getUsers();

    // confirm the user exists
    if (user) {
        // grab the updated user by sending updateUser the new user data
        const updatedUser = db.updateUser(id, { name: req.body.name, bio: req.body.bio });

        // send back the updated user
        res.status(200).json({ message: "User updated", updatedUser: updatedUser });
    } else if (!users.includes(user)) {
        // let the client know the user could not be updated
        res.status(404).json({ message: "The user with the specified ID does not exist.", attemptedId: id });
    } else {
        res.status(500).json({ message: "The user information could not be modified " })
    }
});

// server endpoints end here //

// starts the server
server.listen(8080, () => {
    console.log("Server listening on port 8080");
});