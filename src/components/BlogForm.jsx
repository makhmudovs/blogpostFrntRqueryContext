import { useState } from "react";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "../request";
import { getTokenConfig } from "../utils/index";
import { useNavigate } from "react-router-dom";
import { useUserDispatch } from "../context/UserContext";
import { useNotificationDispatch } from "../context/NotificationContext";

const BlogForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const blogMutation = useMutation({
    mutationFn: ({ blog, config }) => createBlog(blog, config),
    onSuccess: (newBlog) => {
      console.log("Blog created successfully:", newBlog);
      queryClient.setQueryData(["blogs"], (old) => [...old, newBlog]);
      setIsModalOpen(false);
      setTitle("");
      setAuthor("");
      setUrl("");
      setLikes(0);
      notificationDispatch({
        type: "setMessage",
        message: "Created successfully",
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
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = getTokenConfig();
    if (!config) {
      console.log("No config, redirecting to login");
      dispatch({ type: "clearUser" });
      navigate("/login", { replace: true });
      return;
    }

    const newBlog = { title, author, url, likes };
    blogMutation.mutate({ blog: newBlog, config });
  };
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        New blog
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add new blog
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border focus:outline-blue-200 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type blog title"
                    required=""
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="author"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    className="bg-gray-50 border focus:outline-blue-200 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type author name"
                    required=""
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Url
                  </label>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    className="bg-gray-50 border focus:outline-blue-200 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type blog url"
                    required=""
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="likes"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Likes
                  </label>
                  <input
                    type="number"
                    name="likes"
                    id="likes"
                    className="bg-gray-50 focus:outline-blue-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white mt-10 block ms-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add blog
              </button>
            </form>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default BlogForm;
