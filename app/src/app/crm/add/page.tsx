"use client"

import {Input} from "@/components/ui/input";
import {useFormState} from "react-dom";
import {createCustomer} from "@/services/customer-action";
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import toast from "react-hot-toast";

const initialFormState = {
  name: "",
  email: "",
  phone: ""
}

function notify(message: string, type: string = 'success') {
  if (type === 'error') {
    toast.error(
        message,
        {
          duration: 4000,
          position: 'top-right',
        }
    )
  }else {
    toast.success(
        message,
        {
          duration: 4000,
          position: 'top-right',
        }
    )
  }
}


export default function AddPage() {
  // @ts-ignore
  const [state, formAction] = useFormState(createCustomer, initialFormState);

  useEffect(() => {
    console.log(state)
    if (state.code === 400) {
      // @ts-ignore
      notify(state.message, 'error')
      return
    }else if (state.code === 200) {
      // @ts-ignore
      notify('Customer created successfully')
      // @ts-ignore
      window.location.href = `/crm/${state.data?.customer.id}`
      return
    }
  }, [state]);

  return (
      <section
          className={"justify-center flex"}
      >
        <form
            className={"flex flex-col items-center justify-center min-h-screen py-2 w-fit gap-4"}
            action={formAction}
        >
          <h1>
            New Customer
          </h1>
          <Input
              placeholder={"Name"}
              name={"name"}
              type={"text"}
          />
          <Input
              placeholder={"Email"}
              name={"email"}
              type={"email"}
          />
          <Input
              placeholder={"Phone"}
              name={"phone"}
              type={"tel"}
          />
          <Button
              type={"submit"}
          >
            Submit
          </Button>
        </form>
      </section>
  )
}