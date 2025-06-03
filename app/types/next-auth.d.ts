import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    type: string
  }
  
  interface Session {
    user: {
      id: string
      email: string
      name: string
      type: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    type: string
  }
}