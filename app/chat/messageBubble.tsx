import { Card, CardContent } from "@/components/ui/card";
import { Message } from "./chatWindow";

export default function MessageBubble({ message }: { message: Message }) {
    const { senderType, content, timestamp } = message;
    
    const isUser = senderType === "user";
    
    return (
        <div className={`w-full flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className="w-3/4">
                <Card className={`${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                    <CardContent className="p-3">
                        <div className="text-sm">{content}</div>
                        <div className="text-xs mt-2 opacity-70">
                            {new Date(timestamp).toLocaleTimeString()}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}