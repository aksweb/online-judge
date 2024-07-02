const mongoose = require('mongoose');
const User = require('./models/Users'); // Replace with your User model location
const { DBConnection } = require('./database/db')

async function migrateUsers() {
    try {
        // Connect to MongoDB

        DBConnection();

        // Add profilePicture field to existing users if it doesn't already exist
        const users = await User.find();
        for (const user of users) {
            if (!user.profilePicture) {
                user.profilePicture = ''; // Default value
                await user.save();
            }
        }

        console.log('Migration completed successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error during migration:', err);
        mongoose.connection.close();
    }
}

migrateUsers();
