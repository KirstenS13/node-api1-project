// 5 required endpoints = 5 functions
// get users
// get user by id
// post user
// delete user
// update user

// User Schema
/* {
    id: number as string,
    name: "string",
    bio: "string"
} */

// Create the user array
// use "let" not "const" because we need to add and delete from this array
let users = [
    {
        id: "1",
        name: "Harry Potter",
        bio: "The Chosen One"
    },
    {
        id: "2",
        name: "Hermione Granger",
        bio: "The Smart One"
    },
    {
        id: "3",
        name: "Ronald Weasley",
        bio: "The Funny One"
    }
];

// Create the functions to manipulate the users
const getUsers = () => {
    return users;
};

const getUserById = id => {
    return users.find(user => user.id === id);
};

const createUser = user => {
    const newUser = {
        id: String(users.length + 1),
        ...user
    };
    users.push(newUser);
    return newUser;
};

const deleteUser = id => {
    users = users.filter(user => user.id !== id);
};

const updateUser = (id, user) => {
    const index = users.findIndex(user => user.id === id);
    users[index] = {
        ...users[index],
        ...user
    };
    return users[index];
};

// Export the functions so the endpoints can use them
module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
}