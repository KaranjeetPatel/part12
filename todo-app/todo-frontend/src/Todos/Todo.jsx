import React from "react";

const Todo = ({ todo, deleteTodo, completeTodo }) => {
  const onClickDelete = () => {
    deleteTodo(todo);
  }

  const onClickComplete = () => {
    completeTodo(todo);
  }

  const doneInfo = (
    <>
      <span style={{color: "#1f871f"}}>This todo is done</span>
      <span>
        <button onClick={onClickDelete}> Delete </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span style={{color:" maroon"}}>This todo is not done</span>
      <span>
        <button onClick={onClickDelete}> Delete </button>
        <button onClick={onClickComplete}> Set as done </button>
      </span>
    </>
  )

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "80%",
        margin: "auto",
        textAlign:"left",
        backgroundColor: "#e2f9bd"
      }}
    >
      <span style = {{width: "50%", backgroundColor: "#f8f476", color: "#022f02",}}>
        {todo.text}
      </span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  )
}

export default Todo;