import BlogView from "@/components/blog-view";
import React from "react";

async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blog", {
      method: "GET",
      cache: "no-store",
    });

    const result = await apiResponse.json();
    return result?.data;

    //This below code in the get-blog api routs in above result?.data check according to api routes
    // if (extractAllBlogsFromDB) {
    //   return NextResponse({
    //     success: true,
    //     data: extractAllBlogsFromDB,
    //   });
  } catch (error) {
    console.log(error);
  }
}

const Blogs = async () => {
  const blogList = await fetchListOfBlogs();
  console.log(blogList, "bloglist");

  return <BlogView />;
};

export default Blogs;
