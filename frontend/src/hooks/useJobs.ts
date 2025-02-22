import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  fetchJobs,
  fetchJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../api/job";

// Fetch all jobs
export const useJobs = () => {
  return useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.data.currentPage < lastPage.data.totalPages
        ? lastPage.data.currentPage + 1
        : undefined;
    },
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
