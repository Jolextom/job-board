import { AxiosError } from "axios";

export function handleAxiosError(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      // API returned an error response (4xx, 5xx)
      return (
        error.response.data?.message || "An error occurred. Please try again."
      );
    } else if (error.request) {
      // No response received (e.g., network issue)
      return "No response from server. Please check your internet connection.";
    }
  } else if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
