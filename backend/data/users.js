import bcrypt from "bcryptjs";

const users = [
    {
        name: "Amin User",
        email: "admin@email.com",
        password: bcrypt.hashSync("test123", 10),
        isAdmin: true,
    },
    {
        name: "Jane Doe",
        email: "jane@email.com",
        password: bcrypt.hashSync("test123", 10),
        isAdmin: false,
    },
    {
        name: "John Ham",
        email: "john@email.com",
        password: bcrypt.hashSync("test123", 10),
        isAdmin: false,
    },
];

export default users;
