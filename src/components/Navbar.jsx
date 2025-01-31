import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/authSlice";

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-500 p-4 flex justify-between">
      <h1 className="text-white">Shopper</h1>
      <div>
        <Link to="/" className="text-white mr-4">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-white mr-4">Dashboard</Link>
            <Link to="/cart" className="text-white mr-4">Cart</Link>
            <button onClick={() => dispatch(signOut())} className="text-white">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin" className="text-white mr-4">Sign In</Link>
            <Link to="/signup" className="text-white">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
