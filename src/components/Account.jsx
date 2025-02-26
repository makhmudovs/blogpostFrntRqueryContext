import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDispatch, useUser } from "../context/UserContext";

const Account = () => {
  const [expanded, setExpanded] = useState(false);
  const { user } = useUser();
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "clearUser" });
    //alert here
    navigate("/login", { replace: true });
  };
  return (
    <div className="relative mx-1.5 sm:mx-6 flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        onClick={() => setExpanded(!expanded)}
        type="button"
        className="cursor-pointer flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="user photo"
        />
      </button>
      {/* Dropdown menu */}
      <div
        className={`absolute left-10 top-5 mt-2 z-50 ${
          expanded ? "block" : "hidden"
        } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600`}
        id="user-dropdown"
      >
        <div className="px-4 py-3">
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            Username{":"} {user.username}
          </span>
        </div>
        <div className="px-4 py-3">
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            Name{":"} {user.name}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              onClick={handleLogout}
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
