"use server"

import {queryTest} from "@/services/database-query";
import {Chat} from "./chat-section";

export default async function Home() {
  const res: [] = await queryTest()
  if (!res) return <div>Loading...</div>;
  return (
      <section
      className={"flex flex-col items-center justify-center min-h-screen py-2"}
      >

        <h1>
          Home
        </h1>
        {/*{res?.map((chat: Chat) => (*/}
        {/*    <div*/}
        {/*    key={chat.id}*/}
        {/*    >*/}
        {/*      Test*/}
        {/*    </div>*/}
        {/*))}*/}
        <Chat
        />
      </section>
  );
}
