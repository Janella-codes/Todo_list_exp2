"use client";

import { addTodo } from "@/app/actions";
import { useOptimistic, useRef } from "react";
import Button from "./Button";


type Todo = {
  id: number;
  content: string;
};

type TodosComponentProps = {
  todos: Todo[];
};

export default function TodoComponent({ 
  todos 
}: TodosComponentProps) {
  const ref = useRef<HTMLFormElement>(null);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(todos, (state, newTodo: Todo) => {
    return [...state, newTodo]
  });

  return (
    <>
    <form ref={ref} action={async formData => {
      ref.current?.reset();
      addOptimisticTodo({
        id: Math.random(),
        content: formData.get("content") as string
      })
        await addTodo(formData);
          }}
        className="flex flex-col w-[300px] my-16"
        >
          <input 
            type="text"
            name="content" 
            placeholder="Add a todo" 
            required
          />
          <Button />
        </form>
        <ul className='list-disc'>
        {optimisticTodos.map((todo) => (
            <li key={todo.id}>{todo.content}</li>
        ))}
        </ul>
    </>
);

}