import connectToDB from "@/database";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
