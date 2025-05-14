import { QueryClient } from "@tanstack/react-query";

// Create a client with debugging
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Query error:', error);
      },
      onSuccess: (data) => {
        console.log('Query success:', data);
      }
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      },
      onSuccess: (data) => {
        console.log('Mutation success:', data);
      }
    }
  }
});

