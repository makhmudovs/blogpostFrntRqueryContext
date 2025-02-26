import { useQuery } from "@tanstack/react-query";
import { getBlogs } from "../request";

import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

const Blogs = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error("Error while getting blogs", error);
    return <div>Error occured...</div>;
  }
  return (
    <div className="w-full lg:w-4/5 mx-auto mt-10">
      <div className="flex items-center justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Blogs
        </h5>
        <BlogForm />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
