"use server";

import { getAllChat } from "@/services/database-query";
import { Chat } from "./chat-section";

export default async function Home() {
  // const res: [] = await queryTest()
  // if (!res) return <div>Loading...</div>;
  return (
    <div>
      {/*{res?.map((chat: Chat) => (*/}
      {/*    <div*/}
      {/*    key={chat.id}*/}
      {/*    >*/}
      {/*      Test*/}
      {/*    </div>*/}
      {/*))}*/}
      <Chat />
    </div>
  );
}
