"use client"
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { PenIcon } from "lucide-react";
import ChatWindow from "./chatWindow";
import CodeWindow from "./codeWIndow";



export default function chat() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="Logo">UI Generator</h2>
        </SidebarHeader>

        <SidebarContent>
          <Button variant={"outline"} className="text-lg w-30 m-4 p-5">
            <PenIcon></PenIcon>
            New Chat
          </Button>
        </SidebarContent>

        <SidebarFooter>
          <Card className="flex flex-row items-start gap-3 p-3">
            <Avatar className="rounded-lg w-10 h-10">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="text-sm font-medium">UserName</p>
              <p className="text-xs text-muted-foreground">@evilrabbit</p>
            </div>
          </Card>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 ">
        <div className="p-4 flex flex-row">
          <div className="flex-1 mr-1 p-2 h-screen">
            <ChatWindow />
          </div>
          <div className="flex-1 mr-1 p-2 h-screen">
            <CodeWindow />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
