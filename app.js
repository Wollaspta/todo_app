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

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// ======== Models Import ========
const Todo = require('./models/todo');
const User = require('./models/user');
const localDB = 'mongodb://localhost/todo_app'
// ======== Mongoose Connect ========
function setDb(url) {
  if (process.env.USERDOMAIN === 'ALTUSLAPTOP') {
    console.log("Correct ENV")
    const localDB = 'mongodb://localhost/todo_app'
    const url = process.env.DATABASEURL || localDB;
    return url;
  } else {
    console.log('hosted ENV');
    console.log(process.env.DATABASEURL);
    return url = process.env.DATABASEURL;
  }
}


// const dbRoute = "mongodb+srv://Admin_User:998cars998@cluster0.3eyge.gcp.mongodb.net/todo_app?retryWrites=true&w=majority";
mongoose.connect(setDb(), {
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