import {ReactNode} from "react";
import {Navbar} from "@/app/navbar";

export default function DashboardLayout({
                                          children, // will be a page or nested layout
                                        }: {
  children: ReactNode
}) {
  return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Navbar/>
        {children}
      </section>
  )
}