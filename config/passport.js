const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ 
      usernameField: "email" ,
      passwordField: 'password'
    }, 
      async (email, password, done) => {
        try{
          const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        
          if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
          }
          
          const isMatch = await user.comparePassword(password);
          if (!isMatch) {
            return done(null, false, { msg: 'Invalid password.' });
          }
          return done(null, user);
        } catch(err){
          return done(err);
        }
    })
  );


  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
