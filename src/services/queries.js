import { useMutation, useQueryClient } from "@tanstack/vue-query";
import {
  createTodo,
  deleteTodo,
  loginUser,
  registerUser,
  toggleTodo,
  updateTodo,
} from "./api";
import { toast } from "vue-sonner";

// register
export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

// login
export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => toggleTodo(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      toast.success("Todo status updated ✅", {
        style: { backgroundColor: "#22c55e", color: "#fff" },
      });
    },
    onError: (error) => {
      console.error("Toggle failed:", error.message);
      toast.error("Failed to update todo ❌", {
        style: { backgroundColor: "#ef4444", color: "#fff" },
      });
    },
  });
};

export const useToggleDetailTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => toggleTodo(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(["todos", id]);
      toast.success("Todo status updated ✅", {
        style: { backgroundColor: "#22c55e", color: "#fff" },
      });
    },
    onError: (error) => {
      console.error("Toggle failed:", error.message);
      toast.error("Failed to update todo ❌", {
        style: { backgroundColor: "#ef4444", color: "#fff" },
      });
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task created", {
        style: { backgroundColor: "#22c55e", color: "#fff" },
      });
    },
    onError: (error) => {
      console.log("Create failed:", error.message);
      toast.error("Failed to create task ❌", {
        style: { backgroundColor: "#ef4444", color: "#fff" },
      });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task updated ✅", {
        style: { backgroundColor: "#22c55e", color: "#fff" },
      });
    },
    onError: (error) => {
      console.log("Create failed:", error.message);
      toast.error("Failed to update task ❌", {
        style: { backgroundColor: "#ef4444", color: "#fff" },
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted 🗑️", {
        style: { backgroundColor: "#22c55e", color: "#fff" },
      });
    },
    onError: (error) => {
      console.log("Delete failed:", error.message);
      toast.error("Failed to delete task ❌", {
        style: { backgroundColor: "#ef4444", color: "#fff" },
      });
    },
  });
};
