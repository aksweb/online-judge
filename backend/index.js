const express = require('express')
const { DBConnection } = require('./database/db');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const User = require('./models/Users');

//creating express app
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


DBConnection();

//routes
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.post("/register", async (req, res) => {
    try {
        //get data from rreques body
        //destructuring
        const { firstName, lastName, email, password } = req.body;
        //check all data recieved
        if (!(firstName && lastName && email && password)) {
            return res.status(400).send("Please enter all the required feilds");
        }
        //check user exits
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log(email);
            return res.status(400).send("User alrady exists. Enter new email.");
        }
        // encrypt
        const hashedPassword = bcrypt.hashSync(password, 10);

        //save
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        //generate token for user
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })

        //append this token to user
        user.token = token;

        //send the response and object
        user.password = undefined;
        res.status(201).json({ message: "New user successfully created", user })


    } catch (err) {
        console.log("Error while registering", err);
    }
})

app.post("/login", async (req, res) => {
    try {
        //get details
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            res.status(400).send("You are not registered. Please register to gain access")
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).send("Wrong password");
        }

        // Generate token for user
        const token = jwt.sign({ id: existingUser._id, email }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        //store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, //only manipulate by server not by client/user
        };

        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });


    } catch (err) {
        console.log("Error while logging", err);
    }
});

app.listen(3000, () => { console.log("server is listening on port 3000"); })