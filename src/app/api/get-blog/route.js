import { NextResponse } from "next/server";

export async function GET() {
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! please try again later",
    });
  }
}
