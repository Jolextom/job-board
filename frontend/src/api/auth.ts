import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const logoutUser = async () => {
  await axiosInstance.post("/auth/logout");
  localStorage.removeItem("token");
};
