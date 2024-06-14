"use server";

import { getAllChat } from "@/services/database-query";
import { Chat } from "./chat-section";

export default async function Home() {
  return (
    <div>
      <Chat
      />
    </div>
  );
}
