"use server";

import {Input} from '@/components/ui/input';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const LoginPage = async () => {

  return (
      <form
          className={"flex flex-col items-center justify-center min-h-screen py-2"}
      >
        <section
            className={"flex flex-col items-center justify-center gap-4 "}
        >
          <h1>Login Page</h1>
          <Input
              type={"text"}
              placeholder={"Enter your username"}
          />
          <Input
              type={"password"}
              placeholder={"Enter your password"}
          />

          <Link
              href={"/"}
              type={"submit"}
          >
            <Button
                variant={"default"}
                size={"default"}
            >
              Login
            </Button>
          </Link>
        </section>
      </form>
  );
}

export default LoginPage;