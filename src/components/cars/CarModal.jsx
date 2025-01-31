import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createCar } from "../../services/carService";
import { fetchCategories } from "../../services/categoryService";
import toast, { Toaster } from "react-hot-toast";


const CarModal = ({ isOpen, setIsOpen, refreshCars }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errors, setErrors] = useState({});

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  // Validation function
  const validateForm = () => {
    let errors = {};
    if (!selectedCategory) errors.category = "Category is required.";
    if (!make.trim()) errors.make = "Make is required.";
    if (!model.trim()) errors.model = "Model is required.";
    if (!color.trim()) errors.color = "Color is required.";
    if (!registrationNo.trim()) errors.registrationNo = "Registration Number is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    const carData = {
      category: selectedCategory,
      make,
      model,
      color,
      registrationNo,
    };
  
    try {
      const result = await createCar(carData);
  
      if (result?.payload?.status === 500) {
        toast.error(result.payload.message || "An error occurred.");
        return;
      }
  
      if (result?.payload?.status === 400) {
        toast.error(result.payload.message || "A car with this registration number already exists.");
        return;
      }
  
      if (result?.payload?.status === 201) {
        toast.success("Car added successfully!");
  
        // Refresh car list, close modal, and reset form fields
        refreshCars();
        setIsOpen(false);
        setMake("");
        setModel("");
        setColor("");
        setRegistrationNo("");
        setSelectedCategory("");
        setErrors({});
      } 
    } catch (error) {
      console.error("Error submitting car:", error);
  
      if (error.response?.status === 400) {
        toast.error(error.response.data.message || "A car with this registration number already exists.");
      } else if (error.response?.status === 500) {
        toast.error(error.response.data.message || "An error occurred. Please try again.");
      } else {
        toast.error("Network error. Please try again.");
      }
    }
  };
  
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center transition-opacity">
        <Toaster/>
      <div className="bg-white p-6 rounded-xl shadow-lg transform transition-all w-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Your Car</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 space-y-2">
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a Category</option>
              {categories.categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {[
            { label: "Make", value: make, setter: setMake, id: "make" },
            { label: "Model", value: model, setter: setModel, id: "model" },
            { label: "Color", value: color, setter: setColor, id: "color" },
            { label: "Registration Number", value: registrationNo, setter: setRegistrationNo, id: "registrationNo" },
          ].map(({ label, value, setter, id }) => (
            <div key={id} className="mb-4 space-y-2">
              <label htmlFor={id} className="block text-sm font-medium">
                {label}
              </label>
              <input
                type="text"
                id={id}
                className="w-full px-4 py-2 border bg-gray-100 rounded-md"
                placeholder={label}
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
              {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
            </div>
          ))}

          <div className="flex gap-4 justify-end items-start">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Save
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              aria-label="Close Modal"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  refreshCars: PropTypes.func.isRequired,
};

export default CarModal;
