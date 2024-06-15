"use client";

import { useState } from "react";
import AddNewBlog from "../add-new-blog";

const BlogView = () => {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
      />
      <div>Blog List Section</div>
    </div>
  );
};

export default BlogView;
