// src/hocs/withDashboardLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Headbar from '../components/Headbar';

const withDashboardLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Headbar />
          <main className="flex-1 p-4 overflow-y-auto">
            <WrappedComponent {...props} />
          </main>
        </div>
      </div>
    );
  };
};

export default withDashboardLayout; // Ensure this is present
