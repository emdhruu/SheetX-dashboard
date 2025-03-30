import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (!req.user) {
      console.log("Google Login Failed: No User Found");
      return res.redirect("http://localhost:3000/login?error=unauthorized");
    }

    console.log("Google Login Success: User Data", req.user);

    // Generate JWT Token
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Redirect with token and user data
    const user = encodeURIComponent(JSON.stringify(req.user)); // Encode user data
    res.redirect(
      `http://localhost:3000/login-success?token=${token}&user=${user}`
    );

    // // Redirect with token
    // res.redirect(`http://localhost:3000/login-success?token=${token}`);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" });
});

export default router;
