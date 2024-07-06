const mongoose = require('mongoose');
const { DBConnection } = require('./database/db')
const Contest = require("./models/Contest")
async function migrateUsers() {
    try {
        // Connect to MongoDB

        DBConnection();

        const result = await Contest.updateMany(
            { photo: { $exists: false } }, // Find contests where the photo field does not exist
            { $set: { photo: '' } } // Set the default value for the photo field
        );
        console.log(`${result.nModified} contests updated with the new photo field`);
    } catch (error) {
        console.error('Error updating contests:', error);
    } finally {
        await mongoose.disconnect();
    }
}

migrateUsers();
