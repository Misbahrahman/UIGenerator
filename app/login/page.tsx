"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function login() {
    const [isLogin , setIsLogin] = useState(true);
    const router = useRouter();

    const handleLogin = () => {
        router.push('/chat');
    }

    const handleSignup = () => {
        router.push('/chat');
    }

    return <>
    <Card className="flex flex-col items-center justify-center m-4 p-8 w-96 mx-auto mt-50">
        <CardTitle className="text-2xl">{isLogin ? "Login" : "Register"}</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <Input type="text" placeholder="UserId" className="w-full"></Input>
        <Input type="password" placeholder="password" className="w-full"></Input>
        <Button className="w-full" onClick={handleLogin}> {isLogin ? "Login" : "Signup"} </Button>
        {
            isLogin ? 
            <CardContent>Don't have an account <Button className="text-sm" variant={"outline"} onClick={() => setIsLogin(false)}> Register</Button></CardContent>
            : <Button className="text-sm" variant={"outline"} onClick={() => setIsLogin(true)}> Login</Button>
        }
    </Card>
    </>
}