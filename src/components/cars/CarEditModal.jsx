import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateCar } from "../../services/carService";
import { fetchCategories } from "../../services/categoryService";

const CarEditModal = ({ isOpen, setIsOpen, carToEdit, refreshCars }) => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategoriesData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (carToEdit) {
      setMake(carToEdit.make);
      setModel(carToEdit.model);
      setColor(carToEdit.color);
      setRegistrationNo(carToEdit.registrationNo);
      setSelectedCategory(carToEdit.category ? carToEdit.category._id : "");
    }

    fetchCategoriesData();
  }, [carToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!make || !model || !color || !registrationNo || !selectedCategory) {
      alert("All fields are required!");
      return;
    }

    const updatedCarData = {
      make,
      model,
      color,
      registrationNo,
      category: selectedCategory,
    };

    try {
      await updateCar(carToEdit._id, updatedCarData);
      refreshCars();
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-all">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-md animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4">Edit Car</h3>
        
        {/* Category Selection */}
        <div className="mb-4 space-y-2">
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <select
            id="category"
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {categories.categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Make Input */}
        <div className="mb-4 space-y-2">
          <label htmlFor="make" className="block text-sm font-medium">Make</label>
          <input
            type="text"
            id="make"
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
            placeholder="Car Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </div>

        {/* Model Input */}
        <div className="mb-4 space-y-2">
          <label htmlFor="model" className="block text-sm font-medium">Model</label>
          <input
            type="text"
            id="model"
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
            placeholder="Car Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>

        {/* Color Input */}
        <div className="mb-4 space-y-2">
          <label htmlFor="color" className="block text-sm font-medium">Color</label>
          <input
            type="text"
            id="color"
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
            placeholder="Car Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>

        {/* Registration Number Input */}
        <div className="mb-4 space-y-2">
          <label htmlFor="registrationNo" className="block text-sm font-medium">Registration Number</label>
          <input
            type="text"
            id="registrationNo"
            className="w-full px-4 py-2 border rounded-md bg-gray-100"
            placeholder="Car Registration Number"
            value={registrationNo}
            onChange={(e) => setRegistrationNo(e.target.value)}
            required
          />
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

CarEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  carToEdit: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    make: PropTypes.string,
    model: PropTypes.string,
    color: PropTypes.string,
    registrationNo: PropTypes.string,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  }),
  refreshCars: PropTypes.func.isRequired,
};

export default CarEditModal;
