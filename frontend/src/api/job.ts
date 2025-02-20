import axiosInstance from "./axiosInstance";

export const fetchJobs = async () => {
  const response = await axiosInstance.get("/jobs");
  console.log(response);
  return response.data;
};

export const fetchJobById = async (id: string) => {
  const response = await axiosInstance.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData: object) => {
  const response = await axiosInstance.post("/jobs", jobData);
  return response.data;
};

export const updateJob = async (id: string, jobData: object) => {
  const response = await axiosInstance.put(`/jobs/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await axiosInstance.delete(`/jobs/${id}`);
  return response.data;
};
