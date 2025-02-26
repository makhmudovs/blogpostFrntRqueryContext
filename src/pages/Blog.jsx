import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { useUserDispatch } from "../context/UserContext";
import { useNotificationDispatch } from "../context/NotificationContext";
import { getBlog } from "../request";
import { updateBlog, deleteBlog } from "../request";
import { getTokenConfig } from "../utils/index";
import CommentForm from "../components/CommentForm";
import { useState } from "react";

const Blog = () => {
  const [likeBtnDisabled, setLikeBtnDisabled] = useState(false);
  const { id } = useParams();

  const {
    data: blog,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlog(id),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const likeMutation = useMutation({
    mutationFn: ({ blog, config }) => updateBlog(blog, config),
    onSuccess: (likedBlog) => {
      console.log(likedBlog);
      queryClient.invalidateQueries(["blog"]);
      notificationDispatch({
        type: "setMessage",
        message: "Liked successfully",
        messageType: "success",
      });
      setTimeout(() => {
        notificationDispatch({
          type: "clearMessage",
        });
      }, 2500);
    },
    onError: (error) => {
      console.error("Error creating blog:", error);
      notificationDispatch({
        type: "setMessage",
        message: error.request.response,
        messageType: "error",
      });
      setTimeout(() => {
        notificationDispatch({
          type: "clearMessage",
        });
      }, 2500);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, config }) => deleteBlog(id, config),
    onSuccess: (deletedBlog) => {
      console.log(deletedBlog);
      queryClient.invalidateQueries(["blogs"]);
      navigate("/", { replace: true });
      notificationDispatch({
        type: "setMessage",
        message: "Deleted successfully",
        messageType: "success",
      });
      setTimeout(() => {
        notificationDispatch({
          type: "clearMessage",
        });
      }, 2500);
    },
    onError: (error) => {
      console.error("Error deleting blog:", error);
      notificationDispatch({
        type: "setMessage",
        message: error.request.response,
        messageType: "error",
      });
      setTimeout(() => {
        notificationDispatch({
          type: "clearMessage",
        });
      }, 2500);
    },
  });

  const handleLike = (blog) => {
    // eslint-disable-next-line no-unused-vars
    const { user, ...restItems } = blog;
    const config = getTokenConfig();
    console.log("Config from getTokenConfig:", config);

    if (!config) {
      dispatch({ type: "clearUser" });
      navigate("/login", { replace: true });
      return;
    }

    likeMutation.mutate({ blog: restItems, config });
  };

  const handleDelete = (id) => {
    const config = getTokenConfig();

    if (!config) {
      dispatch({ type: "clearUser" });
      navigate("/login", { replace: true });
      return;
    }

    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteMutation.mutate({ id, config });
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full lg:w-1/2 mx-auto mt-10 shadow-sm border border-gray-200 rounded-lg p-4">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Blog
      </h5>

      <div className="grid grid-cols-2 p-2 gap-2">
        <h3 className="text-lg">
          Title: <span className="font-semibold">{blog.title}</span>
        </h3>
        <p className="text-md">
          Author: <span className="font-semibold">{blog.author}</span>
        </p>
        <p className="text-md">
          Url: <span className="font-semibold">{blog.url}</span>
        </p>
        <p className="text-md">
          Likes: <span className="font-semibold">{blog.likes}</span>
        </p>
      </div>

      <div className="flex justify-end items-center rounded-md" role="group">
        <button
          onClick={() => {
            setLikeBtnDisabled(true);
            handleLike(blog);
            setTimeout(() => {
              setLikeBtnDisabled(false);
            }, 2500);
          }}
          type="button"
          disabled={likeBtnDisabled}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
        >
          <svg
            className="w-3 h-3 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
          </svg>
          Like
        </button>
        <button
          onClick={() => handleDelete(blog.id)}
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="w-3 h-3 me-2"
            viewBox="0 0 16 16"
          >
            <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
          </svg>
          
          Delete
        </button>
      </div>

      <div className="my-4 border-t border-gray-200 pt-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Comments:
        </h2>
      </div>
      <div className="">
        <CommentForm id={blog.id} />

        <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
          {blog.comments.map((comment, i) => (
            <li key={i}>
              <span className="font-semibold text-gray-900 dark:text-white">
                {comment}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Blog;
