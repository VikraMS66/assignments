const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", (req, res) => {
  // Implement admin signup logic
  const email = req.body.email;
  const password = req.body.password;

  Admin.create({
    email,
    password,
  });

  res.json({
    message: "Admin Created Successfully!",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;

  const newCource = await Course.create({
    title,
    description,
    price,
    imageLink,
  });

  console.log(newCource);
  res.json({
    message: "Cource created successfully",
    courseId: newCource._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  res.json({
    courses: allCourses,
  });
});

module.exports = router;
