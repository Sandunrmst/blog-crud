import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}
