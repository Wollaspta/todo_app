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



// ======== Models Import ========
const Todo = require('./models/todo');


// ======== Routes import =======

const todoRoutes = require('./routes/todo')

// ======== Routes use ========

app.use(todoRoutes);


// ======== Mongoose Connect ========

const dbRoute = "mongodb+srv://Admin_User:998cars998@cluster0.3eyge.gcp.mongodb.net/todo_app?retryWrites=true&w=majority";
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));



app.listen(port, function () {
  console.log("Active on port " + port)
});