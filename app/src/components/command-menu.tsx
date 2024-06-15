"use client"

import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useRef} from "react";


function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter(); // Get the router object
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }

    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open])

  return (
      <CommandDialog open={open} onOpenChange={setOpen}
      >
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList
        >
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
                onClick={() => {
                  router.push("/crm")
                }}
            >
              Open CRM
            </CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
  )
}


export {
  CommandMenu
}