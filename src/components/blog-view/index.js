"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const initialBlogFormData = {
  title: "",
  description: "",
};

const BlogView = ({ blogList }) => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);

  //Refresh the page to get newly added data to show in real-time
  const router = useRouter();

  //This part is not necessary
  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();

      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        router.refresh(); //Refresh the page to get newly added data to show in real-time
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  console.log(blogList);
  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 ">
        {blogList && blogList.length > 0
          ? blogList.map((blogItem) => (
              <Card key={blogItem._id} className="p-6">
                <CardContent>
                  <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                  <CardDescription>{blogItem?.description}</CardDescription>
                </CardContent>
                <div className="flex gap-4 justify-end  items-center pr-5">
                  <Button>Edit</Button>
                  <Button className="bg-red-600 hover:bg-red-500">
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          : null}
      </div>
    </div>
  );
};

export default BlogView;
