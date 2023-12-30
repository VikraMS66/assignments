const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://vikram:VikDev2024@cluster0.o3roxy5.mongodb.net/course_selling_app"
);

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  email: String,
  password: String,
});

const UserSchema = new mongoose.Schema({
  // Schema definition here
  email: String,
  password: String,
  purchasedCources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: String,
  description: String,
  price: Number,
  imageLink: String,
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
