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
import { Label } from "../ui/label";

const initialBlogFormData = {
  title: "",
  description: "",
};

const BlogView = ({ blogList }) => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [currentDeleteBlogID, setCurrentDeleteBlogID] = useState(null);
  const [noBlog, setNoblog] = useState(false);
  //For Edit bloga and update blog
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);

  //Refresh the page to get newly added data to show in real-time
  const router = useRouter();

  //This part is not necessary
  useEffect(() => {
    router.refresh();
  }, []);

  //The way we can show no blogs intead of same grid layout
  useEffect(() => {
    if (blogList && blogList.length === 0) {
      setNoblog(true);
    } else {
      setNoblog(false);
    }
  }, [blogList]); // This will run whenever blogList changes

  //Form Data validation

  const [errors, setError] = useState(false);
  function handleDataValidation() {
    if (
      blogFormData.description.trim() !== "" &&
      blogFormData.title.trim() !== ""
    ) {
      handleSaveBlogData();
      setError(false);
    } else {
      setError(true);
    }
  }
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
  // This function will call the delete button is clicked
  function handleDeleteBlogByID(blogID) {
    setCurrentDeleteBlogID(blogID); // Save the blog ID
    setShowPopupDelete(true); // Show the confirmation popup
  }
  // This function will call when the user confirms deletion
  async function confirmDeletion() {
    if (currentDeleteBlogID) {
      try {
        const apiResponse = await fetch(
          `/api/delete-blog?id=${currentDeleteBlogID}`,
          {
            method: "DELETE",
          }
        );
        const result = await apiResponse.json();

        if (result?.success) {
          router.refresh(); // Refresh after successful deletion
          setShowPopupDelete(false); // Close the popup
          setCurrentDeleteBlogID(null); // Reset the current blog ID
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  //Handle Edit
  function handleEdit(getCurrentBlog) {
    setCurrentEditedBlogID(getCurrentBlog?._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialog(true);
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
        handleDataValidation={handleDataValidation}
        errors={errors}
        currentEditedBlogID={currentEditedBlogID}
        setCurrentEditedBlogID={setCurrentEditedBlogID}
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
                  <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
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
      {noBlog && (
        <Label className="flex justify-center items-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center">
          {" "}
          No blog found! Please add your first blog 😍
        </Label>
      )}

      {showPopupDelete && (
        <AlertDialog open={showPopupDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                blog details and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowPopupDelete(false)}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={confirmDeletion}>Continue</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default BlogView;
