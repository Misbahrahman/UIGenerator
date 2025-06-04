import { Card, CardContent } from "@/components/ui/card";
import { Message } from "./chatWindow";

export default function MessageBubble({ message }: { message: Message }) {
    const { senderType, content, timestamp } = message;
    
    const isUser = senderType === "user";
    
    return (
        <div className={`w-full flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className="w-3/4">
                <Card className={`${
                    isUser 
                        ? 'bg-black text-white border-red-600 border-2' 
                        : 'bg-gray-50 text-black border-gray-300 border'
                }`}>
                    <CardContent className="p-3 relative">
                        <div className="text-sm font-medium">{content}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}