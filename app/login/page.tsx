"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/chat");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Registration successful but login failed");
        } else {
          router.push("/chat");
        }
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center m-4 p-8 w-96 mx-auto mt-20">
      <CardHeader className="items-center text-center w-full">
        <CardTitle className="text-2xl">
          {isLogin ? "Login" : "Register"}
        </CardTitle>
        <CardDescription>
          {isLogin ? "Enter your credentials to login" : "Create a new account"}
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full space-y-4">
        {!isLogin && (
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        )}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          className="w-full"
          onClick={isLogin ? handleLogin : handleSignup}
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
        </Button>

        <div className="text-center">
          {isLogin ? (
            <p className="text-sm">
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={() => setIsLogin(false)}
                className="p-0"
              >
                Register
              </Button>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() => setIsLogin(true)}
                className="p-0"
              >
                Login
              </Button>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
