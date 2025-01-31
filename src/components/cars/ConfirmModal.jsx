import PropTypes from "prop-types";

const ConfirmationModal = ({ isOpen, setIsOpen, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white p-6 rounded-md shadow-lg transform transition-all">
        <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
        <p className="text-gray-700">{message}</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmationModal;










