"use client";
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
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function chat() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [htmlCssCode, setHtmlCssCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: bold;
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        
        .cta-btn {
            background: #fff;
            color: #667eea;
            padding: 15px 30px;
            border: none;
            border-radius: 5px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .cta-btn:hover {
            background: #f0f0f0;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Welcome to the Future</h1>
        <p>Create amazing landing pages with our AI-powered editor</p>
        <button class="cta-btn">Get Started</button>
    </section>
</body>
</html>`);

  

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  
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
              <p className="text-sm font-medium">
                {session ? session?.user?.name : "username"}
              </p>
              <p className="text-xs text-muted-foreground">
                {session ? session?.user?.email : "username"}
              </p>
            </div>
          </Card>
          <Button onClick={handleLogout}>Logout</Button>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 ">
        <div className="p-4 flex flex-row">
          <div className="flex-1 mr-1 p-2 h-screen">
            <ChatWindow setHtmlCssCode={setHtmlCssCode}/>
          </div>
          <div className="flex-1 mr-1 p-2 h-screen">
            <CodeWindow
              htmlCssCode={htmlCssCode}
              setHtmlCssCode={setHtmlCssCode}
            />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
