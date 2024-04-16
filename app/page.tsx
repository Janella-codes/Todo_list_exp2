import sql from "postgres";
import prisma from "@/lib/prisma";
import TodoComponent from "@/app/components/todos-component";
import Link from "next/link";
import { DeleteForm } from "./delete-form";


let sqlConnect = sql(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export default async function Page() {
  const todos = await prisma.todo.findMany();

return (
  <>
    
  <main className='flex min-h-screen flex-col items-center w-full p-24'>
      <h1 className='text-4xl font-bold'>Todos</h1>
      <TodoComponent  todos={todos}/>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.content}
            <DeleteForm id={todo.id} todo={todo.content} />
          </li>
        ))}
      </ul>
  </main>
  </>
);
}