const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});


/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const countTodos = async () => {
    const count = Number(await redis.getAsync("added_todos"));
    return redis.setAsync("added_todos",  count + 1); 
  }
  countTodos();

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET one todo from list of todo's */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo;
  if (todo) {
    return res.json(todo);
  }
  res.sendStatus(405); 
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.body;
/*  console.log("The object for update", todo);  */

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.todo._id,
    { ...todo},
    { new: true, useFindAndModify: false} 
  );
  if (updatedTodo) { return res.json(updatedTodo) };
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
