import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const fetchCategories = async (page, limit, searchTerm) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/categories`, {
        params: { page, limit, search: searchTerm },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      console.log(response);
      return response.data.data;
    } catch (error) {
      toast.error("Error fetching categories.");
      throw error;
    }
  };
  

export const createCategory = async (category) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/categories/create`, category, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    toast.success("Category created successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error creating category.");
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/categories/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    toast.success("Category deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error deleting category.");
    throw error;
  }
};
export const updateCategory = async (id, category) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(`${API_URL}/categories/${id}`, category, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      toast.success("Category updated successfully!");
      return response.data;
    } catch (error) {
      toast.error("Error updating category.");
      throw error;
    }
  };