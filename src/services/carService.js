import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;


const getAuthToken = () => {
  return localStorage.getItem("authToken");
};


export const fetchCars = async (page, limit, searchTerm) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/cars`, {
      params: { page, limit, search: searchTerm },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    toast.error("Error fetching cars.");
    throw error;
  }
};

// Create a new car
export const createCar = async (car) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/cars/create`, car, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    toast.success("Car added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error adding car.");
    throw error;
  }
};

// Update an existing car
export const updateCar = async (id, car) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/cars/${id}`, car, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    toast.success("Car updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error updating car.");
    throw error;
  }
};

// Delete a car
export const deleteCar = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/cars/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    toast.success("Car deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error("Error deleting car.");
    throw error;
  }
};
