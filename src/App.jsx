// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import withDashboardLayout from "./hocs/withDashboardLayout"; // Ensure correct path
import NotFound from "./components/NotFound";
import DashboardMain from "./components/DashboardMain";
import Categories from "./components/categories/CategoryPage";
import Cars from "./components/cars/CarPage";
// Wrap both components with HOC
const EnhancedDashboard = withDashboardLayout(DashboardMain);
const EnhancedCategory = withDashboardLayout(Categories);
const EnhancedCars = withDashboardLayout(Cars);

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Default route to Products when navigating to /dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <EnhancedDashboard />  {/* Default to Products */}
          </ProtectedRoute>
        } />

        {/* Protected route for Cart */}
        <Route path="/cat" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <EnhancedCategory />  {/* Wrap Cart with HOC */}
          </ProtectedRoute>
        } />

        <Route path="/car" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <EnhancedCars />  {/* Wrap Cart with HOC */}
                </ProtectedRoute>
                } />

        {/* You can add more protected routes as needed */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
