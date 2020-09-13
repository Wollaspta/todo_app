const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const User = require('../models/user');
const Todo = require('../models/todo');
// ======== SHow login Form ========
router.get('/login', function (req, res) {
  res.render('user/login');
});
// ======== Login useer ========
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/todo',
    failureRedirect: '/login'
  }), function (req, res) {
  });

// ======== Create a new user ========
router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("user/register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/todo");
    });
  });
});
// ======== Show register form ========
router.get('/register', function (req, res) {
  res.render('user/register')
});

router.get("/logout", function (req, res) {
  req.logOut();
  res.redirect("/login");
});


module.exports = router;