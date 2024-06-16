import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    //connect to the DB
    await connectToDB();
    const { searchParams } = new URL(req.url);
    //this will get id from the url
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    //this will automatically delete from the DB
    const deleteCurrectBlogID = await Blog.findByIdAndDelete(getCurrentBlogID);
    if (deleteCurrectBlogID) {
      return NextResponse.json({
        success: true,
        message: "Blog is deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again.",
    });
  }
}
