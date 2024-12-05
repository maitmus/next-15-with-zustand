import { useMemo } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

interface ITodoState {
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
  setTodoCheckById: (id: number) => void;
}

export const useTodoStore = create(
  immer<ITodoState>((set) => ({
    todos: [],
    addTodo: (todo) =>
      set((state) => {
        state.todos.push(todo);
      }),
    setTodoCheckById: (id) => {
      set((state) => {
        state.todos.map((todo) => {
          if (todo.id == id) {
            todo.completed = !todo.completed;
          }
        });
      });
    },
  }))
);

export const useFilteredTodos = (completed: boolean) => {
  const todos = useTodoStore((state) => state.todos);

  return useMemo(
    () => todos.filter((todo) => todo.completed == completed),
    [completed, todos]
  );
};
