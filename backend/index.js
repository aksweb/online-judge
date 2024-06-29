const express = require('express');
const { DBConnection } = require('./database/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/Users');
const Contest = require('./models/Contest');
const bodyParser = require('body-parser');

const cors = require('cors')
const multer = require('multer');
const path = require('path');


// creating express app
const app = express();

// middlewares
app.use(express.json());
// app.use(cors());
app.use(cors({
    origin: 'http://127.0.0.1:5173', // Replace with your frontend URL
    credentials: true  // Allow credentials (cookies)
}));
// app.use(cors({ credentials: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

// Multer configuration for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });
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

// Example of setting cookie in Node.js (Express.js)
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
        const token = jwt.sign({ userEmail: existingUser.email, role: existingUser.adminRole }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, { secure: true, sameSite: "None", maxAge: 3600000 });
        res.json({ userEmail: existingUser.email, token, adminRole: existingUser.adminRole }); // Return the user's role along with the token

    } catch (err) {
        console.log("Error while logging in", err);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/logout', (req, res) => {
    // Logic to handle logout, e.g., invalidating tokens, clearing session
    res.clearCookie("token"); // clear the cookie from the client
    res.clearCookie("role"); // clear the cookie from the client
    res.status(200).json({ message: "Logout successful" });
    res.status(200).send({ message: 'Logout successful' });
});




// Middleware to handle multipart/form-data and store files
app.post('/create', upload.any(), async (req, res) => {
    console.log("create called ");
    console.log("problems : ", req.body.problems);

    const { useremail, contestName, duration, startTime, endTime } = req.body;
    console.log("files: ", req.body.files);
    try {
        // Parse problems data from req.body.problems
        let problems = req.body.problems;
        if (typeof problems === 'string') {
            problems = JSON.parse(problems);
        }

        // Attach file paths if files are uploaded
        problems = problems.map((problem, index) => {
            return {
                ...problem,
                inputFile: req.files.find(file => file.fieldname === `problems[${index}][inputFile]`)?.path || '',
                outputFile: req.files.find(file => file.fieldname === `problems[${index}][outputFile]`)?.path || ''
            };
        });

        // Find the user
        let user = await User.findOne({ email: useremail });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new contest
        const newContest = new Contest({
            contestName,
            duration,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            problems,
            createdBy: user._id,
        });

        // Save the contest
        const savedContest = await newContest.save();

        // Add the contest reference to the user's contests
        user.contests.push(savedContest._id);
        await user.save();

        res.status(201).json({ message: 'Contest created successfully!', contest: savedContest });
    } catch (error) {
        console.error('Error creating contest:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//get contests
app.get('/getcontests', async (req, res) => {
    try {
        // Find users with adminRole: true
        const adminUsers = await User.find({ adminRole: true }).select('_id');
        const adminUserIds = adminUsers.map(user => user._id);

        // Find contests created by admin users
        const contests = await Contest.find({ createdBy: { $in: adminUserIds } })
            .populate('createdBy', 'username')
            .exec();

        res.json(contests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to fetch contest by ID
app.get('/contest/:id', async (req, res) => {
    try {
        const contestId = req.params.id;
        const contest = await Contest.findById(contestId).populate('createdBy', 'username').exec();

        if (!contest) {
            return res.status(404).json({ message: 'Contest not found' });
        }

        res.json(contest);
    } catch (error) {
        console.error('Error fetching contest by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to fetch problems from contests whose end date has passed
app.get('/problemsFromExpiredContests', async (req, res) => {
    try {
        // Get current date/time
        const currentDate = new Date();

        // Query contests where end time is less than current date
        const contests = await Contest.find({ endTime: { $lt: currentDate } })
            .populate('problems', 'name description testCases')
            .exec();

        // Extract problems from all contests
        let problems = [];
        contests.forEach(contest => {
            problems.push(...contest.problems);
        });

        res.json(problems);
    } catch (err) {
        console.error('Error fetching problems from expired contests:', err);
        res.status(500).json({ error: err.message });
    }
});

// Static files route for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});