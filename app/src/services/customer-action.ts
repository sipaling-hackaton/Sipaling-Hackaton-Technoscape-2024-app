"use server";

import { prismaClient } from "@/services/prisma-client";
import { error } from "console";
import { z } from "zod";

async function getAllCustomer() {
  try {
    const allCustomer = await prismaClient.customer.findMany();
    console.log(allCustomer);
    return allCustomer as [];
  } catch (e) {
    return [];
  }
}

async function getCustomerById(id: string) {
  try {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: id,
      },
    });
    return customer as any;
  }
  catch (e: any){
    return {}
  }
}

async function getCustomerByEmail(email: string) {
  const customer = await prismaClient.customer.findFirstOrThrow({
    where: {
      email: email,
    },
  });
  return customer as any;
}

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
});

async function createCustomer(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
      code: 400,
    };
  }
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    // check if email already exists
    const existingCustomer = await prismaClient.customer.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingCustomer) {
      throw new Error("Email already exists");
    }

    const customer = await prismaClient.customer.create({
      data: data,
    });

    return {
      data: {
        customer: customer,
      },
      code: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      code: 400,
    };
  }
}

async function updateCustomer(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
      code: 400,
    };
  }
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };

    const customer = await prismaClient.customer.update({
      where: {
        id: formData.get("id") as string,
      },
      data: data,
    });

    return {
      data: {
        customer: customer,
      },
      code: 200,
    };
  } catch (error: any) {
    return {
      message: error.message,
      code: 400,
    };
  }
}

export {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  getCustomerByEmail,
  updateCustomer,
};
