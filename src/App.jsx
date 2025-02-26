import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Blogs from "./pages/Blogs";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Notification from "./components/Notification";
import User from "./pages/User";

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4">
      <div className="">
        <Navbar />
        <Notification />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
