import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchJobs,
  fetchJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../api/job";

// Fetch all jobs
export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
};

// Fetch a single job by ID
export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id,
  });
};

// Create a new job
export const useCreateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });
};

// Update a job
export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, jobData }: { id: string; jobData: object }) =>
      updateJob(id, jobData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });
};

// Delete a job
export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["jobs"] }),
  });
};
