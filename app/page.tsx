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
  <Link className="links" href="https://janellasplace.com"><h1>Home</h1></Link>
    <Link className="links" href={"./page2"}> <h1>Delete</h1> </Link>

      <h1 className='text-4xl font-bold'>Todos</h1>
      <TodoComponent  todos={todos}/>

      
  </main>
  </>
);
}