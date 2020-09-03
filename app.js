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

// ======== Mongoose Connect ========

const dbRoute = "mongodb+srv://Admin_User:998cars998@cluster0.3eyge.gcp.mongodb.net/todo_app?retryWrites=true&w=majority";
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));

// ====== Routes ========
app.get("/", function (req, res) {
  res.redirect("/todo");
});
// ======== Show all todos and create todos ========
app.get("/todo", function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      // console.log("Yeet")
      res.render('todos', { todos: todos })
    }
  })
});
// ======== Create a new Todo ========
app.post("/todo", function (req, res) {
  Todo.create(req.body.todo, function (err, newTodo) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/todo')
      // console.log(req.body.todo)
    }
  });
});

// ======= Update Todo =======
app.put("/todo/update/:id", function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    todo.done = !todo.done;
    todo.save(function (err, updatedTodo) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/")
      }
    })
  })
});

// ======== Delete todo =======
app.delete("/todo/delete/all", function (req, res) {
  Todo.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("DB Cleared");
    res.redirect("/");
  });
});

app.delete("/todo/delete/:id", function (req, res) {
  Todo.findByIdAndRemove(req.params.id, req.body.todo, function (err, dTodo) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
  })
});

app.listen(port, function () {
  console.log("Active on port " + port)
});