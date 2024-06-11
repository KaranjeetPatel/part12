import { render, fireEvent } from '@testing-library/react'
import { screen } from '@testing-library/react'
import Person from '../components/Person.jsx'

test("check setups", () => {
  expect(3).toBe(3);
})


test("simple test for rendering phone record correctly", () => {
  const record = {
    name: "Test name",
    number: "123456"
  }
  const remove = vi.fn()


  render(<Person name={record.name} number={record.number} remove={remove} />)

  expect(screen.getByText("Test name")).toBeInTheDocument()
  expect(screen.getByText("123456")).toBeInTheDocument()
  expect(screen.getByText("Test name")).toBeDefined()
  expect(screen.queryByText("123456")).toBeDefined()

  fireEvent.click(screen.getByText("delete"))
  expect(remove).toHaveBeenCalledTimes(1)

})
