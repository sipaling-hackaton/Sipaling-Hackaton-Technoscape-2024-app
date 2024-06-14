"use server"
// use client

import {getCustomerById} from "@/services/customer-action";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default async function Home({params}: {
  params: {
    id: string;
  };
}) {
  const customer = await getCustomerById(params.id)
  console.log(customer)
  if (!customer) {
    return <div>
      Not Found
    </div>
  }
  return (
      <form
          action={""}
          className={"justify-center items-center flex flex-col p-[2rem] gap-4 bg-gray-50 min-h-screen"}
      >
        <section
         className='justify-center flex flex-col p-[2rem] gap-4 max-w-[50rem] bg-white
         border border-gray-200 rounded-lg shadow-lg'>


          <section className={"flex flex-row-reverse items-end gap-4"}>
            <Button>
              Save
            </Button>
          </section>
          <Input
              name="name"
              defaultValue={customer.name}
          />

          <Input
              name="email"
              defaultValue={customer.email}
          />

          <Input
              name="email"
              defaultValue={customer.phone}
          />
        </section>
      </form>
  );
}