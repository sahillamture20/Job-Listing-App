const e = require("express");
const router = e.Router();
const bcrypt = require("bcrypt");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.json({
    message: "User route is working",
    status: "Working",
  });
});

// async = declaring the non-blocking code
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists, please use another email address",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (isPasswordCorrect) {
      const token = jwt.sign(
        {email:existingUser.email}, //Payload = object that you neet to convert to string/token
        'secret', //Secret key for the encrypt token and validation signature  
        {expiresIn:'1h'}//Optinal argument to make the token expire in time
      );
      res.status(200).json({
        message: "Login successful",
        token: token
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
});

module.exports = router;
