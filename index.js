// import express from node_modules
const express = required("express");

// import the "fake" database you made in a separate file

// create server using express
const server = express();

// install middleware to help parse JSON request bodies
server.use(express.json());

// server endpoints go here // - eg all the get, post, delete, etc



// server endpoints end here //

// starts the server
server.listen(8080, () => {
    console.log("Server listening on port 8080");
});