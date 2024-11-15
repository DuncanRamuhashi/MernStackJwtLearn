import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the User model
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  // If the password is not modified, skip hashing
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Call the next middleware or save operation
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

export default User;
