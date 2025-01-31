import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { FaSearch, FaPlus } from "react-icons/fa";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import { fetchCategories, deleteCategory } from "../../services/categoryService";
import CategoryEditModal from "./CategoryEditModal";
import Pagination from "../Pagination";
import ConfirmationModal from "./ConfirmationModal";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategories(currentPage, 10, searchTerm);
      setCategories(data.categories);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load categories. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]); 
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(categoryToDelete._id);
      loadCategories();
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError("Failed to delete category. Please try again later.");
      console.error(err);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditCategory = (categoryName) => {
    console.log("Edited Category:", categoryName);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search categories"
            className="px-4 py-2 border rounded-l-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="ml-2 text-gray-600" />
        </div>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
          }}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <FaPlus className="mr-2" />
          Add Category
        </button>
      </div>

      {loading && <div>Loading categories...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <CategoryTable
          categories={categories}
          setIsModalOpen={setIsModalOpen}
          setCategoryToEdit={setCategoryToEdit}
          setIsEditMode={setIsEditMode}
          setIsEditModalOpen={setIsEditModalOpen}
          setCategoryToDelete={setCategoryToDelete}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      <CategoryModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        categoryToEdit={categoryToEdit}
        isEditMode={isEditMode}
        refreshCategories={loadCategories}
      />

      <CategoryEditModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        categoryToEdit={categoryToEdit}
        handleEditCategory={handleEditCategory}
        refreshCategories={loadCategories}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onConfirm={handleDeleteCategory}
        message={`Are you sure you want to delete the category: ${categoryToDelete?.name}?`}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

CategoryTable.propTypes = {
  categories: PropTypes.array.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setCategoryToEdit: PropTypes.func.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
  setCategoryToDelete: PropTypes.func.isRequired,
  setIsDeleteModalOpen: PropTypes.func.isRequired,
};

CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  categoryToEdit: PropTypes.object,
  isEditMode: PropTypes.bool.isRequired,
  refreshCategories: PropTypes.func.isRequired,
};

CategoryEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  categoryToEdit: PropTypes.object,
  handleEditCategory: PropTypes.func.isRequired,
  refreshCategories: PropTypes.func.isRequired,
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default CategoryPage;
