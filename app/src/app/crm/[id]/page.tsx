"use server";
// use client

import {getCustomerById} from "@/services/customer-action";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import Link from "next/link";

export default async function CRMDetails(
    {params}: { params: { id: string } }
) {
  const customer = await getCustomerById(params.id);
  if (!customer) {
    return <div>Not Found</div>;
  }
  return (
      <form
          action={""}
          className={
            "items-center flex flex-col p-[2rem] gap-4 min-h-screen"
          }>
        <section
            className={
              "flex flex-row-reverse items-end gap-4 w-full max-w-[40rem]"
            }>
          <Button className="bg-[#14ae5c]">Save</Button>

          <Link href={`/${customer.id}`}>
            <Button className={"bg-gradient-to-r from-[#7a2180] to-[#e40276]"}>
              AI Chat
            </Button>
          </Link>
        </section>

        <section
            className="p-10 justify-center flex flex-col gap-4 w-full max-w-[40rem]
         border border-gray-200 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div>
            <Label className={"text-lg font-bold"} htmlFor={"name"}>
              Name
            </Label>
            <Input name="name" defaultValue={customer.name} required/>
          </div>

          <div>
            <Label className={"text-lg font-bold"} htmlFor={"email"}>
              Email
            </Label>
            <Input name="email" defaultValue={customer.email} required/>
          </div>

          <div>
            <Label className={"text-lg font-bold"} htmlFor={"phone"}>
              Phone
            </Label>
            <Input name="phone" defaultValue={customer.phone} required/>
          </div>

          <div>
            <Label className={"text-lg font-bold"} htmlFor={"phone"}>
              Address
            </Label>
            <Input name="address" defaultValue={customer.address} required/>
          </div>
        </section>
      </form>
  );
}
