"use server";

import {Navbar} from "../navbar";
import {Payment, columns} from "./column";
import {DataTable} from "./data-table";
import {getAllCustomer} from "@/services/customer-action";

const AnalyticsPage = async () => {
  const customers = await getAllCustomer();

  return (
      <section className={"flex flex-col min-h-screen"}>
        <div className="container mx-auto py-10 ">
          <DataTable columns={columns} data={customers}/>
        </div>
      </section>
  );
};

export default AnalyticsPage;
