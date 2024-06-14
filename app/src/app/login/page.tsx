"use server";

import {Input} from '@/components/ui/input';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const LoginPage = async () => {

  return (
      <section
          className={"flex flex-col items-center justify-center min-h-screen py-2 bg-[rgb(34,40,49)] relative"}
      >
        <Image
            className={"fixed w-full object-cover z-0"}
            src="/login-bg.webp"
            alt="Login BG"
            width={1920}
            height={1080}
        />

        <form
            className={"flex flex-col items-center justify-center gap-7 bg-white px-3 py-[2rem] rounded-md z-10"}
        >

          <h1
              className={"text-2xl font-bold"}
          >
            Login
          </h1>

          <Input
              className={"border-2 border-gray-500"}
              type={"text"}
              defaultValue={"user.cs@company.com"}
              placeholder={"Enter your username"}
          />
          <Input
              className={"border-2 border-gray-500"}
              type={"password"}
              defaultValue={"12323132323"}
              placeholder={"Enter your password"}
          />

          <Link
              className={"w-full"}
              href={"/"}
              type={"submit"}
          >
            <Button
                className={"w-full bg-[rgb(0,173,181)]"}
                variant={"default"}
                size={"default"}
            >
              Login
            </Button>
          </Link>
        </form>
      </section>
  );
}

export default LoginPage;