"use server"

import {getAllChat} from "@/services/database-query";
import {Chat} from "./chat-section";
import { Reference } from "./reference-section";

export default async function Home() {
  // const res: [] = await queryTest()
  // if (!res) return <div>Loading...</div>;
  return (
      <section>
        {/*{res?.map((chat: Chat) => (*/}
        {/*    <div*/}
        {/*    key={chat.id}*/}
        {/*    >*/}
        {/*      Test*/}
        {/*    </div>*/}
        {/*))}*/}
        <Reference
        />
      </section>
  );
}
