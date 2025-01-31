// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-5xl text-gray-600">Oops! Page not found.</p>
      <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="mt-6 px-4 py-2 bg-[#89089F] text-white rounded-md hover:bg-[#88088F] transition">
        Go back to Home
      </Link>
    </div>
  );
}
