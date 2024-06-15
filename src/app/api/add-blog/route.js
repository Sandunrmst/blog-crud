import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

//Step 02 create schema for db tables
//Create db schema for adding new blog data to db

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

//Step 01 create post request to the db
export async function POST(req) {
  try {
    await connectToDB();
    const extractBlogData = await req.json();
    const { title, description } = extractBlogData;

    //Step 03 validate
    //validate errors on when adding new blog
    const { error } = AddNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newlyCreatedBlogItem = await Blog.create(extractBlogData);
    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog added sucessfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
