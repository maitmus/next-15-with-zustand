"use client";

import { ITodo, useFilteredTodos, useTodoStore } from "@/store/todoStore";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const { todos, addTodo, setTodoCheckById } = useTodoStore();
  const completedTodos = useFilteredTodos(true);
  const uncompletedTodos = useFilteredTodos(false);
  const [newTodoContent, setNewTodoContent] = useState("");

  return (
    <div>
      <h1 className={styles.header}>Todo List</h1>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo.id} className={styles.todo}>
            <p>{todo.text}</p>
            <p>{todo.completed ? "Completed" : "Uncompleted"}</p>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => setTodoCheckById(todo.id)}
            />
          </div>
        ))
      ) : (
        <div>
          <p>No Todos!</p>
        </div>
      )}
      <div className={styles.inputDiv}>
        <input
          type="text"
          placeholder="할 일"
          onChange={(event) => {
            setNewTodoContent(event.target.value);
          }}
        />
        <button
          onClick={() => {
            addTodo({
              id: todos.length + 1,
              text: newTodoContent,
              completed: false,
            });
          }}
        >
          Add
        </button>
      </div>
      <FilteredTodos todos={completedTodos} completed></FilteredTodos>
      <FilteredTodos todos={uncompletedTodos} completed={false}></FilteredTodos>
    </div>
  );
}

function FilteredTodos({
  todos,
  completed,
}: {
  todos: ITodo[];
  completed: boolean;
}) {
  return (
    <div className={styles.filteredTodos}>
      <p>{completed ? "Completed" : "Uncompleted"}</p>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div key={todo.id} className={styles.todo}>
            <p>{todo.text}</p>
          </div>
        ))
      ) : (
        <div>
          <p>No Todos!</p>
        </div>
      )}
    </div>
  );
}
