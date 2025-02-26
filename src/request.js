import axios from "axios";
const baseUrl = "/api/blogs";

export const getBlogs = async () => {
  const request = await axios.get(baseUrl);
  const response = await request.data;
  return response;
};

export const createBlog = async (blog, config) => {
  console.log("from requies blog", blog);
  console.log("from requies confi", config);
  const req = await axios.post(baseUrl, blog, config); // Pass config directly
  const res = await req.data;
  return res;
};

export const getBlog = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  const response = await request.data;
  return response;
};

export const login = async (creds) => {
  const request = await axios.post("/api/login", creds);
  const response = await request.data;
  return response;
};

export const updateBlog = async (blog, config) => {
  const req = await axios.put(
    `${baseUrl}/${blog.id}`,
    { ...blog, likes: blog.likes + 1 },
    config
  );
  const res = await req.data;
  return res;
};

export const deleteBlog = async (id, config) => {
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

export const getUsers = async () => {
  const request = await axios.get("/api/users");
  const response = await request.data;
  return response;
};

export const getUser = async (id) => {
  const request = await axios.get(`/api/users/${id}`);
  const response = await request.data;
  return response;
};

export const createComment = async (id, comment) => {
  const req = await axios.post(`/api/blogs/comment/${id}`, {comments:comment});
  const res = await req.data;
  return res;
};
