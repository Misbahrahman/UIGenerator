"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const handleChatClick = () => {
    router.push('/chat');
  };
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50">
      <div className='Logo-big'>UI Generator</div>
      <Button 
        onClick={handleChatClick}
        size="lg"
        className="px-8 py-3 text-lg font-semibold"
      >
        Start Chat
      </Button>
    </div>
  );
}