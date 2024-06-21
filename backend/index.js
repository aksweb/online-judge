const express = require('express');
const { DBConnection } = require('./database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/Users');
const cors = require('cors')
// creating express app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

DBConnection();

// routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/register', async (req, res) => {
    try {
        // get data from request body
        const { username, email, password, adminRole } = req.body;

        // check all data received
        if (!(username && email && password)) {
            return res.status(400).send("Please enter all the required fields");
        }

        // check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log(email);
            return res.status(400).send("User already exists. Enter a new email.");
        }

        // encrypt password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // save user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            adminRole: adminRole || false
        });

        // generate token for user
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        // send the response and object
        user.password = undefined;
        res.status(201).json({ message: "New user successfully created", user, token });

    } catch (err) {
        console.log("Error while registering", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
    try {
        // get details
        const { email, password } = req.body;

        // find user
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).send("You are not registered. Please register to gain access.");
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).send("Wrong password");
        }

        // generate token for user
        const token = jwt.sign({ id: existingUser._id, email }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        // store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        // send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });

    } catch (err) {
        console.log("Error while logging in", err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
