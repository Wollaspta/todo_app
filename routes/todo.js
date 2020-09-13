const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Todo = require('../models/todo');

// ======== Routes ========

router.get('/', function (req, res) {
  res.redirect('/todo')
})

// ======== Show all todos and create todos ========
router.get("/todo", isLoggedIn, function (req, res) {
  req.user;
  User.findById(req.user).populate('todos').exec(function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      res.render('todo/todo', { user: foundUser });
    }
  });
});

// ======== Create a new Todo ========
router.post("/todo/new", isLoggedIn, function (req, res) {
  const userId = req.user;
  User.findById(userId, function (err, user) {
    if (err) {
      console.log(err)
      res.redirect('/todo')
    } else {
      Todo.create(req.body.todo, function (err, todo) {
        if (err) {
          console.log(err);
        } else {
          todo.save();
          user.todos.push(todo);
          user.save();
          res.redirect('/todo')
        }
      });
    }
  });
});

// // // ======== Delete all todos =======
// router.delete("/todo/delete/all", isLoggedIn, function (req, res) {
//   Todo.deleteMany({}, function (err, dAllTodo) {
//     console.log(dAllTodo)
//     if (err) {
//       console.log(err)


// ======== Delete one todo ========
router.delete("/todo/delete/:id", isLoggedIn, function (req, res) {
  Todo.findByIdAndRemove(req.params.id, req.body.todo, function (err, dTodo) {
    if (err) {
      console.log(err)
      res.redirect('/todo')
    } else {
      User.findByIdAndUpdate(req.user.id, { $pull: { todos: dTodo.id } }, function (err) {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/todo');
        }
      });
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/register")
}

module.exports = router;