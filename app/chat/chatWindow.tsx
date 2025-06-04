  "use client";
  import { Card, CardFooter } from "@/components/ui/card";
  import { SidebarTrigger } from "@/components/ui/sidebar";
  import MessageBubble from "./messageBubble";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { useEffect, useState } from "react";
  import { useSession } from "next-auth/react";
  import Loader from "@/components/ui/loader";

  export interface Message {
    id: string;
    senderId: string;
    senderType: "ai" | "user";
    content: string;
    timestamp: string;
  }

  export default function ChatWindow({ setHtmlCssCode }: any) {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
      if (!newMessage.trim()) return;
      await handleMessageSave(newMessage, "user");
      setNewMessage("");
    };

    async function fetchMessages() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/messages?userId=${session?.user.id}`);
        const data = await res.json();
        setMessages(data.messages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    async function handleMessageSave(content: string, senderType: "user" | "ai") {
      try {
        if (!session?.user?.id) {
          console.error("No user session found");
          return { success: false, error: "User not authenticated" };
        }

        const res = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session.user.id,
            content: content,
            senderType: senderType,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to save message");
        }

        const data = await res.json();
        await fetchMessages();
        return { success: true, data: data.data };
      } catch (error) {
        console.error("Error saving message:", error);
      }
    }

    useEffect(() => {
      fetchMessages();
    }, [session]);

    return (
      <Card className="h-full mb-4 flex flex-col">
        <SidebarTrigger className="sidebar-icon" />
        <div className="flex-1 overflow-y-auto p-4">
          {isLoading ? (
            <Loader />
          ) : (
            messages.map((message: Message) => {
              return <MessageBubble key={message.id} message={message} />;
            })
          )}
        </div>

        <CardFooter className="border-t p-4">
          <div className="flex w-full gap-2 items-center">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
