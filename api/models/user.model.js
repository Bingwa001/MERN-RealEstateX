// user.model.js
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs'; // Import bcryptjs for password hashing

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Mongoose pre-save hook to hash the password before saving
userSchema.pre('save', async function(next) {
    try {
        // Check if the password is modified or this is a new user
        if (!this.isModified('password')) {
            return next(); // If password is not modified, proceed
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(this.password, 10);
        
        // Replace the plain password with the hashed one
        this.password = hashedPassword;
        next(); // Proceed to save the user
    } catch (error) {
        next(error); // Pass any error to the next middleware or callback
    }
});

const User = mongoose.model('User', userSchema);

export default User;
