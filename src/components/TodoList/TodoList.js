import React from "react";
import Header from "./Header";
import Todo from "./Todo";
import { useState } from "react";
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [status, setStatus] = useState("all");

  const todoTitleHandler = (event) => {
    setTodoTitle(event.nativeEvent.target.value);
  };

  const statusHandler = (event) => {
    setStatus(event.nativeEvent.target.value);
  };

  const addTodo = (event) => {
    event.preventDefault();
    if (todoTitle.length) {
      let newTodo = {
        id: todos.length + 1,
        title: todoTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
    }
    setTodoTitle("");
  };

  const editTodo = (id) => {
    let todoArray = [...todos];
    let maintodoIndex = todoArray.findIndex((todo) => todo.id === id);
    todoArray[maintodoIndex].completed = !todoArray[maintodoIndex].completed;
    console.log(todoArray);
    setTodos(todoArray);
  };

  const removeTodo = (id) => {
    let newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };

  return (
    <>
      <Header />
      <form>
        <input
          type="text"
          onChange={todoTitleHandler}
          className="todo-input"
          maxLength="40"
          value={todoTitle}
        />
        <button
          className="todo-button"
          type="submit"
          onClick={(event) => addTodo(event)}
        >
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      <div className="todo-container">
        <ul className="todo-list">
          {status === "completed" &&
            todos
              .filter((todo) => todo.completed)
              .map((todo) => (
                <Todo
                  onEdit={editTodo}
                  onRemove={removeTodo}
                  key={todo.id}
                  {...todo}
                />
              ))}
          {status === "uncompleted" &&
            todos
              .filter((todo) => !todo.completed)
              .map((todo) => (
                <Todo
                  onEdit={editTodo}
                  onRemove={removeTodo}
                  key={todo.id}
                  {...todo}
                />
              ))}
          {status === "all" &&
            todos.map((todo) => (
              <Todo
                onEdit={editTodo}
                onRemove={removeTodo}
                key={todo.id}
                {...todo}
              />
            ))}
        </ul>
      </div>
    </>
  );
}
