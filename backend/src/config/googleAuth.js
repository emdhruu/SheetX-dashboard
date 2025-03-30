const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ["profile", "email", "https://www.googleapis.com/auth/spreadsheets.readonly"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            accessToken,
          });
          await user.save();
        }

        const token = jwt.sign({ userId: user._id, accessToken }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return done(null, { token, user });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
