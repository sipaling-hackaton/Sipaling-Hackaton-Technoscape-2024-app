"use server";

import { getAllChat } from "@/services/database-query";
import { Chat } from "./chat-section";
import Landing from "./landing/page";

export default async function Home() {
  return (
    <div>
      <Landing />
    </div>
  );
}
