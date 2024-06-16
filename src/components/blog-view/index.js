"use client";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  //Refresh the page to get newly added data to show in real-time
  const router = useRouter();

  //This part is not necessary
  useEffect(() => {
    router.refresh();
  }, []);

  //For save blog in db
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
  //For delete blog item from db
  async function handleDeleteBlogByID(getCurrentBlogID) {
    try {
      setShowPopupDelete(true);
      const apiResponse = await fetch(
        `/api/delete-blog?id=${getCurrentBlogID}`,
        {
          method: "DELETE",
        }
      );
      const result = await apiResponse.json();

      if (result?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }
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
                  <Button
                    onClick={() => handleDeleteBlogByID(blogItem._id)}
                    className="bg-red-600 hover:bg-red-500"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))
          : null}
      </div>

      {showPopupDelete && (
        <AlertDialog open={showPopupDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowPopupDelete(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default BlogView;
