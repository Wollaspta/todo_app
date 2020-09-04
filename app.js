const port = process.env.PORT || 8080;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

;

// ======== Models Import ========
const Todo = require('./models/todo');
const User = require('./models/user')

// ======== Mongoose Connect ========
mongoose.connect("mongodb://localhost/todo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));


// ======= Connect to server ========
app.listen(port, function () {
  console.log("Active on port " + port)
})