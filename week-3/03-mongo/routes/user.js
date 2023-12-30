const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", (req, res) => {
  // Implement user signup logic
  const email = req.body.email;
  const password = req.body.password;

  User.create({
    email,
    password,
  });

  res.json({
    message: "User Created Successfully!",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.json({
    courses,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const email = req.headers.email;
  const courseId = req.params.courseId;
  try {
    await User.updateOne(
      {
        email: email,
      },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
    res.json({ message: "Course purchased successfully" });
  } catch (e) {
    console.log(e);
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const email = req.headers.email;
  const user = await User.findOne({
    email: email,
  });

  console.log(user.purchasedCourses);

  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json(courses);
});

module.exports = router;
