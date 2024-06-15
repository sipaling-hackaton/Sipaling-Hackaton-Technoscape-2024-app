"use server";

import { Landing } from "./Landing";
import { getExp } from "../../services/manipulate-exp";
import { getChatCount, sentimentCount } from "@/services/chat";

const LandingPage = async () => {
  const exp = await getExp();
  const chat = await getChatCount();
  const sentiment = await sentimentCount();

  

  return (
    <>
      <Landing sentiment={sentiment} chat={chat} exp={exp} />
    </>
  );
};

export default LandingPage;
