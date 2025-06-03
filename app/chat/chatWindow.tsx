"use client"
import { Card, CardFooter } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MessageBubble from "./messageBubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export interface Message {
  id: string;
  senderId: string;
  senderType: "ai" | "user";
  content: string;
  timestamp: string;
}

export default function ChatWindow() {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    console.log("Send:", newMessage);
    setNewMessage("");
  };
  

  return (
    <Card className="h-full mb-4 flex flex-col">
      <SidebarTrigger className="sidebar-icon" />
      <div className="message-container flex-1 overflow-y-auto p-4">
        
      </div>
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2 items-center">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
