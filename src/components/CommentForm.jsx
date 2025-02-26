import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../context/NotificationContext";
import { createComment } from "../request";
import PropTypes from "prop-types";
const CommentForm = ({ id }) => {
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => createComment(id, comment),
    onSuccess: (commentedBlog) => {
      console.log(commentedBlog);
      queryClient.invalidateQueries(["blog"]);
      // can show success alert
      setComment("");
      notificationDispatch({
        type: "setMessage",
        message: "Commented successfully",
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
        message: error,
        messageType: "error",
      });
      setTimeout(() => {
        notificationDispatch({
          type: "clearMessage",
        });
      }, 2500);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    commentMutation.mutate({ id, comment });
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 mb-4">
      <input
        type="text"
        id="comment"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your comment here"
        required=""
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  id: PropTypes.string,
};

export default CommentForm;
