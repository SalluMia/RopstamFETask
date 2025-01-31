import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaCar } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logodashboard.png'
const Sidebar = () => {
  const location = useLocation(); // Get current route
  const navigate = useNavigate();


  return (
    <aside className="w-2/12 bg-gray-700 text-white h-full">
      {/* User Profile */}
      <div className="flex gap-2 text-center  ">
        
        <div>
        <img
          src={logo}
          alt="User"
          className="w-full h-[150px] rounded-md object-cover"
        />
          <h1 className="m-0 p-0 font-semibold text-4xl">Car Management Dashboard</h1>
          
        </div>
      </div>

      {/* Sidebar Navigation */}
      <ul className="h-[80vh]" style={{ marginTop: "20px" }}>
        {[
          { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
          { path: "/cat", label: "Categories", icon: <FaClipboardList /> },
          { path: "/car", label: "Cars", icon: <FaCar /> },
        ].map(({ path, label, icon }) => (
          <li className="mb-2" key={path}>
            <Link
              to={path}
              className={`flex items-center p-2  transition duration-200 ${
                location.pathname === path
                  ? "bg-white text-gray-700 font-semibold"
                  : "text-gray-400 hover:bg-gray-600 hover:text-white"
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </Link>
          </li>
        ))}

    
      </ul>
    </aside>
  );
};

export default Sidebar;
