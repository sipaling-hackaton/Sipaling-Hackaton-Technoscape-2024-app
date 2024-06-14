"use server"

import { Payment, columns } from "./column"
import { DataTable } from "./data-table"
import {getAllCustomer} from "@/services/customer-action";

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
  const customers = await getAllCustomer()

  return (
      <section
      className={"flex flex-col items-center justify-center min-h-screen py-2"}
      >
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={customers}/>
        </div>
      </section>
  );
}

export default AnalyticsPage;