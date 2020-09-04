const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

// ====== Routes ========
router.get("/", function (req, res) {
  res.redirect("/todo");
});
// ======== Show all todos and create todos ========
router.get("/todo", function (req, res) {
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
router.post("/todo", function (req, res) {
  Todo.create(req.body.todo, function (err, newTodo) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/todo')
      // console.log(req.body.todo)
    }
  });
});

// // ======= Update Todo =======
// router.put("/todo/update/:id", function (req, res) {
//   Todo.findById(req.params.id, function (err, todo) {
//     todo.done = !todo.done;
//     todo.save(function (err, updatedTodo) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.redirect("/")
//       }
//     })
//   })
// });

// ======== Delete todo =======
router.delete("/todo/delete/all", function (req, res) {
  Todo.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("DB Cleared");
    res.redirect("/");
  });
});

router.delete("/todo/delete/:id", function (req, res) {
  Todo.findByIdAndRemove(req.params.id, req.body.todo, function (err, dTodo) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/')
    }
  })
});

module.exports = router;
