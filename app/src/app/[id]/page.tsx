"use server"

import {Chat} from "@/app/chat-section";
import {getCustomerById} from "@/services/customer-action";

export default async function Home({params} : {
    params: {
        id: string
    }
}) {
  const customer = await getCustomerById(params.id)
  return (
    <div>
      <Chat
          customer={customer}
      />
    </div>
  );
}