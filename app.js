const port = process.env.PORT || 8080;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');

// ======== Uses the user info on every route =========
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// ======== App settings =======
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));


// ======== Models Import ========
const Todo = require('./models/todo');
const User = require('./models/user');

// ======== Mongoose Connect ========
const localDB = 'mongodb://localhost/todo_app'
const dbRoute = "mongodb+srv://Admin_User:998cars998@cluster0.3eyge.gcp.mongodb.net/todo_app?retryWrites=true&w=majority";
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));


mongoose.set('useFindAndModify', false);

// ======== Passport config ========
app.use(require('express-session')({
  secret: 'Nina is a cute cat!',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======== Routes import ========
const todoRoutes = require("./routes/todo");
app.use(todoRoutes);

const userRoutes = require('./routes/user');
app.use(userRoutes);

// ======== Connect to server ========
app.listen(port, function () {
  console.log("Active on port " + port)
});