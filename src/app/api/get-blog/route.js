import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //connect to tb
    await connectToDB();
    //Get all Blog.find({})
    const extractAllBlogsFromDB = await Blog.find({});

    //if true send message success and fail send false message
    if (extractAllBlogsFromDB) {
      return NextResponse.json({
        success: true,
        data: extractAllBlogsFromDB,
      });
    } else {
      return new NextResponse.json({
        success: false,
        message: "Something went wrong! please try again later",
      });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse.json({
      success: false,
      message: "Something went wrong! please try again later",
    });
  }
}
