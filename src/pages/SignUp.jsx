import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const images = [
    "https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--log-register-form-user-interface-pack-design-development-illustrations-6430773.png",
    "https://adrack.com/wp-content/uploads/2021/12/signup.png",
    "https://cdni.iconscout.com/illustration/premium/thumb/sign-up-illustration-download-in-svg-png-gif-file-formats--account-login-miscellaneous-pack-illustrations-5230178.png?f=webp",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await dispatch(signUp({ name, email })).unwrap();
      toast.success(response.message);
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      toast.error(error || "Registration failed!");
    }
  };

  return (
    <div className="flex bg-white h-screen">
      <Toaster />
      <div className="hidden md:block w-1/2 unique-color relative">
        <div className="flex flex-col border justify-center items-center h-full">
          <img src={images[currentSlide]} alt="Sign Up" className="w-2/5 h-2/5 object-cover mb-4" />
          <div className="text-center mb-5">
          <h1 className="text-2xl text-white font-semibold">Welcome to Car Management</h1>
          <p className="text-white">Best Cars of Universe</p>
          </div>
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <div key={index} className={`h-2 w-2 rounded-full cursor-pointer ${currentSlide === index ? 'bg-white' : 'bg-gray-300'}`} onClick={() => setCurrentSlide(index)} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2 p-6">
      <div className="mx-20 my-10">
         <h1 className="text-3xl mb-4 font-bold text-gray-600 text-start">Ready to Join!</h1>
         <p>Please enter your credentials for sign up your account!!</p>
       </div>
        <form onSubmit={handleSubmit} className="px-20">
          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="w-full p-2 unique-color text-white rounded-full hover:bg-[#88088F] transition">Create Account</button>
        </form>
        <div className="px-20 mt-4">
          <span className="text-center block">Already have an account?</span>
          <Link to="/signin" className="block border rounded-full   text-center py-2 mt-4 ">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
