import React from "react";
import { logout } from "../auth";
import { useNavigate } from "react-router-dom";
import './DashBoard.css'

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  // localhost:5000/user/api/v2/systems/summary/{sid}
 return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Energy Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//         <StatCard title="Total Production" value="1200 kWh" />
//         <StatCard title="Total Consumption" value="950 kWh" />
//         <StatCard title="Storage Level" value="80%" />
//       </div>
//     </div>
//   );
// };

// const StatCard = ({ title, value }) => (
//   <div className="bg-white p-4 shadow rounded-lg text-center">
//     <h2 className="text-lg font-semibold">{title}</h2>
//     <p className="text-2xl font-bold text-blue-600">{value}</p>
//   </div>
// );

// export default Dashboard;

  <div class="container">
    <div class="header">
      <h1 class="title">Energy Dashboard</h1>
      <button class="logout-btn" onclick="handleLogout()">Logout</button>
    </div>

    <div class="stat-cards">
      <div class="stat-card">
        <h2 class="card-title">Total Production</h2>
        <p class="card-value">1200 kWh</p>
      </div>
      <div class="stat-card">
        <h2 class="card-title">Total Consumption</h2>
        <p class="card-value">950 kWh</p>
      </div>
      <div class="stat-card">
        <h2 class="card-title">Storage Level</h2>
        <p class="card-value">80%</p>
      </div>
    </div>
  </div>)

}

export default Dashboard;
