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
  type: "text" | "image" | "video" | "code";
  status: "sent" | "delivered" | "read";
}

export default function ChatWindow() {
  const [newMessage, setNewMessage] = useState("");

  const dummyData = {
    currentUser: {
      id: "user-1",
      name: "You",
      avatar: "https://github.com/evilrabbit.png"
    },
    aiAssistant: {
      id: "ai-1",
      name: "AI Assistant",
      avatar: "🤖",
      status: "online"
    },
    messages: [
            {
                id: "msg-1",
                senderId: "ai-1",
                senderType: "ai" as const,
                content: "Hello! I'm your AI assistant. How can I help you today?",
                timestamp: "2025-06-03T10:00:00Z",
                type: "text" as const,
                status: "sent" as const
            },
            {
                id: "msg-2",
                senderId: "user-1",
                senderType: "user" as const,
                content: "Can you help me create a React component?",
                timestamp: "2025-06-03T10:01:00Z",
                type: "text" as const,
                status: "sent" as const
            },
            {
                id: "msg-3",
                senderId: "ai-1",
                senderType: "ai" as const,
                content: "Of course! I'd be happy to help you create a React component. What kind of component are you looking to build?",
                timestamp: "2025-06-03T10:01:30Z",
                type: "text" as const,
                status: "sent" as const
            },
            {
                id: "msg-4",
                senderId: "user-1",
                senderType: "user" as const,
                content: "A simple button component with different variants",
                timestamp: "2025-06-03T10:02:00Z",
                type: "text" as const,
                status: "sent" as const
            },
            {
                id: "msg-5",
                senderId: "ai-1",
                senderType: "ai" as const,
                content: "Here's a simple button component with different variants:\n\n```jsx\nimport React from 'react';\n\nconst Button = ({ variant = 'primary', size = 'md', children, ...props }) => {\n  const baseClasses = 'font-medium rounded-lg transition-colors';\n  \n  const variants = {\n    primary: 'bg-blue-600 text-white hover:bg-blue-700',\n    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',\n    danger: 'bg-red-600 text-white hover:bg-red-700'\n  };\n  \n  const sizes = {\n    sm: 'px-3 py-1.5 text-sm',\n    md: 'px-4 py-2',\n    lg: 'px-6 py-3 text-lg'\n  };\n  \n  return (\n    <button \n      className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}\n      {...props}\n    >\n      {children}\n    </button>\n  );\n};\n\nexport default Button;\n```\n\nThis component supports primary, secondary, and danger variants, plus small, medium, and large sizes!",
                timestamp: "2025-06-03T10:02:45Z",
                type: "code" as const,
                status: "sent" as const
            },
            {
                id: "msg-6",
                senderId: "user-1",
                senderType: "user" as const,
                content: "That's perfect! Thank you so much.",
                timestamp: "2025-06-03T10:03:30Z",
                type: "text" as const,
                status: "sent" as const
            },
            {
                id: "msg-7",
                senderId: "ai-1",
                senderType: "ai" as const,
                content: "You're welcome! Feel free to ask if you need help with styling, adding more variants, or creating other components. Happy coding! 🚀",
                timestamp: "2025-06-03T10:03:45Z",
                type: "text" as const,
                status: "sent" as const
            }
        ],
    typingStatus: {
      isTyping: false,
      typingUser: null
    },
    chatMetadata: {
      conversationId: "conv-123",
      startedAt: "2025-06-03T10:00:00Z",
      lastActivity: "2025-06-03T10:03:45Z",
      messageCount: 7
    }
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // You would normally push this to your messages array or backend
    console.log("Send:", newMessage);
    setNewMessage("");
  };
  

  return (
    <Card className="h-full mb-4 flex flex-col">
      <SidebarTrigger className="sidebar-icon" />
      <div className="message-container flex-1 overflow-y-auto p-4">
        {dummyData.messages.map((message , index) => (
          <MessageBubble message={message} key={index} />
        ))}
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
