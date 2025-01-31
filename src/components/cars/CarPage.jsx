import { useState, useEffect, useCallback } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { fetchCars, deleteCar } from "../../services/carService";
import Pagination from "../Pagination";
import CarTable from "./CarTable";
import CarModal from "./CarModal";
import CarEditModal from "./CarEditModal";
import ConfirmationModal from "./ConfirmModal";

const CarPage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // The search term state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [carToEdit, setCarToEdit] = useState(null);
  const [carToDelete, setCarToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCars(currentPage, 10, searchTerm); // Pass the search term to the service function
      setCars(data.cars);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load cars. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleDeleteCar = async () => {
    try {
      await deleteCar(carToDelete._id);
      loadCars();
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError("Failed to delete car. Please try again later.");
      console.error(err);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEditCar = (carName) => {
    console.log("Edited Car:", carName);
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by category name"
            className="px-4 py-2 border rounded-l-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
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
          Add Car
        </button>
      </div>

      {loading && <div>Loading cars...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <CarTable
          cars={cars}
          setIsModalOpen={setIsModalOpen}
          setCarToEdit={setCarToEdit}
          setIsEditMode={setIsEditMode}
          setIsEditModalOpen={setIsEditModalOpen}
          setCarToDelete={setCarToDelete}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}

      <CarModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        carToEdit={carToEdit}
        isEditMode={isEditMode}
        refreshCars={loadCars}
      />

      <CarEditModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        carToEdit={carToEdit}
        handleEditCar={handleEditCar}
        refreshCars={loadCars}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onConfirm={handleDeleteCar}
        message={`Are you sure you want to delete the car: ${carToDelete?.name}?`}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CarPage;
