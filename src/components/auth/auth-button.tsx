"use client"

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { Logout } from "@/lib/actions/auth";

export default function AuthButton() {

  return  (
    
      <form action={Logout} className="flex flex-row gap-1 ">
        <Button type='submit' variant={"ghost"} size={"sm"}>
          <LogOut className="mr-2 h-4 w-4" />
          <span className="text-sm">Logout</span>
        </Button>
      </form>

  ) ;
}