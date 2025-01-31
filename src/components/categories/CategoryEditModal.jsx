import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { updateCategory } from "../../services/categoryService"; 

const CategoryEditModal = ({ isOpen, setIsOpen, categoryToEdit, refreshCategories }) => {
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (categoryToEdit) {
      setCategoryName(categoryToEdit.name); 
    }
  }, [categoryToEdit]);

  const handleSubmit = async () => {
    if (categoryName.trim() === "") {
      alert("Category name cannot be empty!");
      return;
    }

    try {
      await updateCategory(categoryToEdit._id, { name: categoryName });
      refreshCategories();
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-md animate-fadeIn">
        <h3 className="text-lg font-semibold mb-4">Edit Category</h3>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="px-4 py-2 border rounded-md w-full mb-4"
          required
        />
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


CategoryEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  categoryToEdit: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  refreshCategories: PropTypes.func.isRequired,
};

export default CategoryEditModal;
