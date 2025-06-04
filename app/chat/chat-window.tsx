"use client";
import { Card, CardFooter } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import MessageBubble from "./message-bubble";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/loader";
import { useChat } from "@ai-sdk/react";

export interface Message {
  id: string;
  senderId: string;
  senderType: "ai" | "user";
  content: string;
  timestamp: string;
}

export default function ChatWindow({ htmlCssCode ,  setHtmlCssCode }: any) {
  const { data: session, status } = useSession();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    initialMessages: [],
    body: {
      userId: session?.user?.id,
    },
    onFinish: async (message) => {
      await handleMessageSave(message.content, "ai");

      if (setHtmlCssCode && message.content) {
        extractAndSetCode(message.content);
      }
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const extractAndSetCode = (content: string) => {
    const htmlMatch =
      content.match(/```html\n([\s\S]*?)\n```/) ||
      content.match(/```\n([\s\S]*?)\n```/);

    if (htmlMatch && htmlMatch[1]) {
      setHtmlCssCode(htmlMatch[1]);
    } else if (content.includes("<html") || content.includes("<!DOCTYPE")) {
      setHtmlCssCode(content);
    }
  };

  async function fetchMessages() {
    try {
      const res = await fetch(`/api/messages?userId=${session?.user.id}`);
      const data = await res.json();
      const convertedMessages = data.messages.map((msg: Message) => ({
        id: msg.id,
        role: msg.senderType === "user" ? "user" : "assistant",
        content: msg.content,
        createdAt: new Date(msg.timestamp),
      }));

      setMessages(convertedMessages);
      
      //will automaticlly update the html on reload/login
      if(htmlCssCode === ""){
        const lastAIMessageContent = convertedMessages[convertedMessages.length - 1].content;
        extractAndSetCode(lastAIMessageContent);
      }

    } catch (error) {
      console.error("Error fetching messages:", error);
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
      return { success: true, data: data.data };
    } catch (error) {
      console.error("Error saving message:", error);
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await handleMessageSave(input, "user");

    handleSubmit(e);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchMessages();
    }
  }, [session]);

  return (
    <Card className="h-full mb-4 flex flex-col">
      <SidebarTrigger className="sidebar-icon" />
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading ? (
          <div className="text-center text-gray-500 mt-8">
            <p>Start a conversation to generate HTML/CSS code!</p>
          </div>
        ) : (
          messages.map((message) => {
            const convertedMessage: Message = {
              id: message.id,
              senderId: session?.user?.id || "unknown",
              senderType: message.role === "user" ? "user" : "ai",
              content: message.content,
              timestamp:
                message.createdAt?.toISOString() || new Date().toISOString(),
            };

            return (
              <MessageBubble key={message.id} message={convertedMessage} />
            );
          })
        )}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader />
            </div>
          </div>
        )}
      </div>
      <CardFooter className="border-t p-4">
        <form onSubmit={onSubmit} className="flex w-full gap-2 items-center">
          <Input
            placeholder="Describe the HTML/CSS you want to generate..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? "Generating..." : "Send"}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
