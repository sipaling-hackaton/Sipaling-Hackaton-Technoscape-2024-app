"use client";
import { useEffect, useState } from "react";
import { Payment, columns } from "./column";
import { DataTable } from "./data-table";
import { getAllCustomer } from "@/services/customer-action";

const AnalyticsPage = async () => {
  const [customers, setCustomers] = useState<any>();
  useEffect(() => {
    getCustomer();
  });

  const getCustomer = async () => {
    try {
      const customer = await getAllCustomer();

      setCustomers(customer);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className={"flex flex-col min-h-screen py-2"}>
      <div className="container mx-auto py-10 ">
        <DataTable columns={columns} data={customers} />
      </div>
    </section>
  );
};

export default AnalyticsPage;
