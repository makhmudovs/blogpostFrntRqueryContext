import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../request";
import { Link } from "react-router-dom";
const Users = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  return (
    <div className="w-full lg:w-1/2 mx-auto mt-10">
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Users
      </h2>
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {users.map((user) => (
          <li key={user.id}>
            <Link
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              to={`/users/${user.id}`}
            >
              {user.username} blogs: {user.blogs.length}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
