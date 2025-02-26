import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Blog = ({ blog }) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700 ">
      <h6 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {blog.title} by {blog.author}
      </h6>
      <Link
        to={`/blogs/${blog.id}`}
        className="inline-flex text-sm items-center text-blue-600 hover:underline"
      >
        More
        <svg
          className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
