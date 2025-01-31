import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
function DashboardMain() {
    return (
     <>
         <div className="bg-green-50 p-6 rounded-xl border">
        <div className="max-w-7xl mx-auto p-8 rounded-lg ">
          {/* Banner section */}
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
             
              <h2 className="text-7xl font-bold text-gray-900 mb-4">Best Car</h2>
              <h2 className="text-3xl font-medium  text-gray-900 mb-4">SERVICE</h2>
              <p className="text-gray-700 mb-4">
                Get ready to explore the latest features of your car! From real-time performance tracking to vehicle
                health insights, this dashboard has everything you need to keep your car in top shape.
              </p>
                <Link to={'/car'} className="bg-green-600 flex justify-center w-2/5 items-center gap-2 uppercase px-8 font-medium py-2 rounded-full text-white">Add Your Car <FaCarSide className="text-xl" /></Link>
            </div>

            <div className="lg:w-1/2">
              <img
                src="https://unblast.com/wp-content/uploads/2022/02/Car-Rental-Process-Illustration.jpg" // Replace with actual car image URL
                alt="Car"
                className="w-full  rounded-lg "
              />
            </div>
          </div>
        </div>
      </div>
     </>
    );
  }
  
  export default DashboardMain;
  