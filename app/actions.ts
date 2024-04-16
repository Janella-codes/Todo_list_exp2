"use server";

import { revalidatePath } from "next/cache";
import sql from "postgres";
import { z } from "zod";
import  FormData from "next";
import prisma from "@/lib/prisma";

let sqlConnect = sql(process.env.DATABASE_URL || process.env.POSTGRES_URL!, {
  ssl: "allow",
});

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export const addTodo = async (formData: FormData) => {
  const content = formData.get("content");

  try {
  await prisma.todo.create({
    data: {
     content: content as string,
    },
  });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/");
}

interface params {
  id: number;
}


export const deleteTodo1 = async( { id }: params) => {


  try {
    await prisma.todo.delete({
      where: { id },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/");

}




export async function createTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  try {
    await sqlConnect`
      INSERT INTO todos (text)
      VALUES (${data.todo})
    `;

    revalidatePath("/");
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function deleteTodo(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("todo"),
  });

  try {
    await sqlConnect`
      DELETE FROM todo
      WHERE id = ${data.id};
    `;

    revalidatePath("/");
    return { message: `Deleted todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to delete todo" };
  }
}
