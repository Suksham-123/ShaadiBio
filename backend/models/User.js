import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. Define the Blueprint (Schema)
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true, // This tells MongoDB to NEVER allow duplicate emails!
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  }
);

// 2. The Encryption Engine (Pre-save hook)
// Right before saving to the database, run this function to scramble the password
userSchema.pre('save', async function (next) {
  // If the password hasn't been changed, move on
  if (!this.isModified('password')) {
    next();
  }

  // Generate a 'salt' (extra random characters to make the hash stronger)
  const salt = await bcrypt.genSalt(10);
  // Replace the plain-text password with the scrambled hash
  this.password = await bcrypt.hash(this.password, salt);
});

// 3. The Password Checker
// We will use this later when the user tries to log in to see if their typed password matches the hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 4. Export the Model
const User = mongoose.model('User', userSchema);

export default User;