import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

const Headbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/signin"); // Redirect to Sign-in
  };

  return (
    <header className="flex justify-end p-4 relative border-b">
      {user ? (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-sm flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-md"
          >
             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s" alt="" className="h-10 w-10 rounded-full object-cover" />
            <span>{user.name}</span>
            <FaCaretDown />
          </button>
  
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-32">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/signin")}
          className="text-sm flex justify-center items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full"
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default Headbar;
