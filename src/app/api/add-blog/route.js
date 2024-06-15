import connectToDB from "@/database"
import Joi from "joi";
import { NextResponse } from "next/server"

//Create db schema for adding new blog data to db
const AddNewBlog = Joi.object({
    title : Joi.string().required(),
    description: joi.string().required()
})

export async function POST(req){
    try {
        await connectToDB();
        const extractBlogData = await req.json();
        const {title, description} = extractBlogData;

        //validate errors on when adding new blog
        const {error} = AddNewBlog.validate({
            title, description
        })

        if(error){
            return NextResponse.json({
                sucess: false,
                message: error.details[0].message
            })
        }

        const newlyCreatedBlogItem = await Blob.create(extractBlogData);
        if(newlyCreatedBlogItem){
            return NextResponse.json({
                sucess: true,
                message: 'Blog added sucessfully'
            })
        }else{
            return NextResponse.json({
                sucess: false,
                message: 'Something went wrong! Please try again'
            })
        }


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            sucess: false,
            message: 'Something went wrong! Please try again'
        })
    }
}