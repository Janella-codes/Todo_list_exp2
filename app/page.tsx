import sql from "postgres";
import prisma from "@/lib/prisma";
import TodoComponent from "@/app/components/todos-component";

let sqlConnect = sql(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

export default async function Page() {
  const todos = await prisma.todo.findMany();

return (
  <main className='flex min-h-screen flex-col items-center w-full p-24'>
      <h1 className='text-4xl font-bold'>Todos</h1>
      <TodoComponent  todos={todos}/>
  </main>
);
}