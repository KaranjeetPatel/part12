import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/react'
import Todo from '../Todos/Todo.jsx'

test("check setups", () => {
  expect(3).toBe(3);
})

test("simple test for rendering todo correctly", () => {
  const todo = {
    text: "Testing todo",
    done: false,
  }
  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()

  render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

  expect(screen.getByText("Testing todo")).toBeInTheDocument()
  expect(screen.getByText("This todo is not done")).toBeInTheDocument()
  expect(screen.getByText("Testing todo")).toBeDefined()
  expect(screen.queryByText("This to do is done")).toBeNull()

  fireEvent.click(screen.getByText("Set as done"))
  expect(completeTodo).toHaveBeenCalledTimes(1)
  expect(completeTodo).toHaveBeenCalledWith(todo)

  fireEvent.click(screen.getByText("Delete"))
  expect(deleteTodo).toHaveBeenCalledTimes(1)
  expect(deleteTodo).toHaveBeenCalledWith(todo)

// assume that the buttons are ordered by design as 'Delete' 'Set as done'
  const [firstButton, secondButton] = screen.getAllByRole('button')
  fireEvent.click(firstButton)
  expect(deleteTodo).toHaveBeenCalledWith(todo)
  fireEvent.click(secondButton)
  expect(completeTodo).toHaveBeenCalledWith(todo)

  expect(deleteTodo).toHaveBeenCalledTimes(2)
  expect(completeTodo).toHaveBeenCalledTimes(2)

})