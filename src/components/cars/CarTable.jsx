import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";

const CarTable = ({
  cars,
  setCarToEdit,
  setIsEditModalOpen,
  setCarToDelete,
  setIsDeleteModalOpen,
}) => {
  return (
    <div className="overflow-x-auto border">
      <table className="min-w-full table-auto border-collapse shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-3 text-left border-b">SR</th>
            <th className="px-6 py-3 text-left border-b">Car Category</th>
            <th className="px-6 py-3 text-left border-b">Color</th>
            <th className="px-6 py-3 text-left border-b">Make</th>
            <th className="px-6 py-3 text-left border-b">Model</th>
            <th className="px-6 py-3 text-left border-b">Registration Number</th>
            <th className="px-6 py-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr
              key={car._id}

              className="hover:bg-opacity-70 transition-colors "
            >
              <td className="px-6 py-4 border-b text-sm font-medium">{index + 1}.</td>
              <td className="px-6 py-4 border-b text-sm font-medium">{car.category?.name}</td>
              <td className="px-6 py-4 border-b text-sm font-medium">
  <span className='bg-gray-700 text-white px-4 text-xs py-1 rounded-full'>
    {car.color}
  </span>
</td>

              <td className="px-6 py-4 border-b text-sm font-medium">{car.make}</td>
              <td className="px-6 py-4 border-b text-sm font-medium">{car.model}</td>
              <td className="px-6 py-4 border-b text-sm font-medium">{car.registrationNo}</td>
              <td className="px-6 py-4 border-b flex items-center space-x-4">
                <button
                  onClick={() => {
                    setCarToEdit(car);
                    setIsEditModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 transition-transform duration-300 ease-in transform hover:scale-110 flex items-center space-x-2"
                >
                  <FaEdit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCarToDelete(car);
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

CarTable.propTypes = {
  cars: PropTypes.array.isRequired,
  setCarToEdit: PropTypes.func.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
  setCarToDelete: PropTypes.func.isRequired,
  setIsDeleteModalOpen: PropTypes.func.isRequired,
};

export default CarTable;
