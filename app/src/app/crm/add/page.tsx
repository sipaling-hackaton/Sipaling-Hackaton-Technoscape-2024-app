"use client";

import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { createCustomer } from "@/services/customer-action";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
};

function notify(message: string, type: string = "success") {
  if (type === "error") {
    toast.error(message, {
      duration: 4000,
      position: "top-right",
    });
  } else {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
    });
  }
}

export default function AddPage() {
  // @ts-ignore
  const [state, formAction] = useFormState(createCustomer, initialFormState);

  useEffect(() => {
    console.log(state);
    if (state.code === 400) {
      // @ts-ignore
      notify(state.message, "error");
      return;
    } else if (state.code === 200) {
      // @ts-ignore
      notify("Customer created successfully");
      // @ts-ignore
      window.location.href = `/crm/${state.data?.customer.id}`;
      return;
    }
  }, [state]);

  return (
    <div
      className={
        "flex items-center justify-center min-h-screen py-2 w-[100vw]"
      }>
      <div
        onClick={() => window.history.back()}
        className="cursor-default flex gap-5 items-center fixed top-[5rem] left-[5rem]">
        <Image
          width={30}
          height={30}
          alt="add-button"
          src="../Group (1).svg"></Image>
        <p className="font-bold">Back</p>
      </div>

      <form
        className={
          "flex flex-col justify-center items-center gap-4 bg-[#d9d9d9] rounded-lg p-5 w-[60vw] lg:max-w-[30vw]"
        }
        action={formAction}>
        <h1 className="font-bold bg-clip-text text-transparent bg-gradient-to-r sm:text-2xl md:text-4xl from-[#7A2180] to-[#E40276] font-bold">
          New Customer
        </h1>
        <div className="w-full">
          <label className="font-bold">Name</label>
          <Input placeholder={"Name"} name={"name"} type={"text"} />
        </div>
        <div className="w-full">
          <label className="font-bold">Email</label>
          <Input placeholder={"Email"} name={"email"} type={"email"} />
        </div>
        <div className="w-full">
          <label className="font-bold">Phone</label>
          <Input placeholder={"Phone"} name={"phone"} type={"tel"} />
        </div>

        <Button
          className="mt-4 w-full bg-gradient-to-r from-[#7a2180] to-[#e40276] cursor-pointer hover:opacity-75"
          type={"submit"}>
          Submit
        </Button>
      </form>
    </div>
  );
}
