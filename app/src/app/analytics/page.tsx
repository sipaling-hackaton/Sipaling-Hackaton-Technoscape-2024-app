"use server"

import {getAllChat} from "@/services/database-query";
import {Chat} from "@prisma/client";
import { Payment, columns } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}
const AnalyticsPage = async () => {
  const chat = await getAllChat()
  const data = await getData()
  return (
      <section
      className={"flex flex-col items-center justify-center min-h-screen py-2"}
      >
        <h1>Analytics Page</h1>
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={chat}/>
        </div>
      </section>
  );
}

export default AnalyticsPage;