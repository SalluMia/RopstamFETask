import { useState } from "react";
import PropTypes from "prop-types";
import { createCategory } from "../../services/categoryService";

const CategoryModal = ({ isOpen, setIsOpen, refreshCategories }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({ name: categoryName });
    refreshCategories();
    setIsOpen(false); 
    setCategoryName(""); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center transition-opacity">
      <div className="bg-white p-6 rounded-md shadow-lg transform transition-all">
        <h2 className="text-xl font-semibold">Create Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Add PropTypes for type checking
CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  refreshCategories: PropTypes.func.isRequired,
};

export default CategoryModal;
