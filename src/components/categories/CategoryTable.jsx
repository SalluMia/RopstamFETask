import PropTypes from "prop-types"; // For PropTypes validation
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons from react-icons

const CategoryTable = ({ categories, setCategoryToEdit, setIsEditModalOpen, setCategoryToDelete, setIsDeleteModalOpen }) => {
  return (
    <div className="overflow-x-auto border">
      <table className="min-w-full table-auto border-collapse shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left border-b">SR</th>
            <th className="px-6 py-3 text-left border-b">Category Name</th>
            <th className="px-6 py-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 border-b text-sm font-medium">{index + 1}.</td> {/* SR Number */}
              <td className="px-6 py-4 border-b text-sm font-medium">{category.name}</td>
              <td className="px-6 py-4 border-b flex items-center space-x-4">
              <button
  onClick={() => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  }}
  className="text-blue-500 hover:text-blue-700 transition-transform duration-300 ease-in transform hover:scale-110 flex items-center space-x-2"
>
  <FaEdit className="w-4 h-4" />
</button>

                <button
  onClick={() => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  }}
  className="text-red-500 hover:text-red-700 transition-transform duration-300 ease-in transform hover:scale-110 flex items-center space-x-2"
>
  <FaTrash className="w-3 h-3" />
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CategoryTable.propTypes = {
  categories: PropTypes.array.isRequired,
  setCategoryToEdit: PropTypes.func.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
  setCategoryToDelete: PropTypes.func.isRequired,
  setIsDeleteModalOpen: PropTypes.func.isRequired,
};

export default CategoryTable;
