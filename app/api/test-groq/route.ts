import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "Test API route is working",
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Error in test API route:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error in test API route",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
