// src/models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["tutor", "student"],
      required: true,
    },
    // For tutors: an array of students (references to User documents)
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // For students: an array of teachers (references to User documents)
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bio: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for a more conventional 'id'
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Instead of using global caching, attempt to retrieve the model.
// If it doesn't exist, compile it.
let User;
try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", UserSchema);
}

export default User;
