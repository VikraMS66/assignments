const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWTSecret } = require("../config");
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const email = req.body.email;
  const password = req.body.password;

  await User.create({
    email,
    password,
  });

  res.json({
    message: "User Created Successfully!",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.find({
    email,
    password,
  });

  //console.log(JWTSecret);

  if (user) {
    const token = jwt.sign(
      {
        email,
      },
      JWTSecret
    );

    res.json({
      token,
    });
  } else {
    res.status(411).json({
      msg: "Incorrect email and password",
    });
  }
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
  const email = req.email;
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
  const email = req.email;
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
