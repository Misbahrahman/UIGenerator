import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"


const prisma = new PrismaClient()


export async function GET(request: NextRequest) {
  try {
    console.log(request);
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const messages = await prisma.message.findMany({
      where: {
        senderId: userId
      },
      orderBy: {
        timestamp: 'asc'
      }
    })

    return NextResponse.json({
      messages,
      count: messages.length
    })

  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}



export async function POST(request: NextRequest) {
  try {
    const { userId , content, senderType } = await request.json()

    if (!userId || !content || !senderType) {
      return NextResponse.json(
        { error: "Content and senderType are required" },
        { status: 400 }
      )
    }

    const newMessage = await prisma.message.create({
      data: {
        content,
        senderType,
        senderId: userId, 
        timestamp: new Date() 
      }
    })

    return NextResponse.json({
      message: "Message saved successfully",
      data: newMessage
    }, { status: 201 })

  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    )
  }
}