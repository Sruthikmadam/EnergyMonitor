// // Dashboard.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [userSystems, setUserSystems] = useState({});

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get('/api/auth/me', { withCredentials: true });
//         setUserSystems(res.data.systems);
//       } catch (err) {
//         console.error("Failed to fetch user:", err);
//       }
//     };
//     fetchUser();
//   }, []);

//   return (
//     <div>
//       <h2>Your Systems</h2>
//       {Object.entries(userSystems).map(([systemId, devices]) => (
//         <div key={systemId} className="p-4 border rounded-lg shadow mb-4">
//           <h3 className="text-xl font-semibold">System ID: {systemId}</h3>
//           <ul className="list-disc pl-6">
//             {devices.map((device, idx) => (
//               <li key={idx}>
//                 Platform: {device.platform}, Username: {device.deviceUserId}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from 'react';
import axios from 'axios';
import './DashBoard.css'


function Dashboard () {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
        // console.log(res.data);
        setUser(res.data);
        // console.log(user)
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true }); // back-end clears the cookie
      setUser(null); // optionally clear user state
      window.location.href = "/login"; // redirect to login
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  // console.log("Dashboard rendered");
  // useEffect(() => {
  //   if (user) {
  //     console.log("User loaded:", user);
  //   }
  //   else{
  //     console.log('sorry')
  //   }
  // }, [user]);
  // console.log("Dashboard rendered",user);
  // if (!user) return <p>Loading...</p>;

// function Dashboard(){
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           withCredentials: true,
//         });
//         console.log("✅ API res.data:", res.data);
//         setUser(res.data);
//       } catch (error) {
//         console.error("❌ API error:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     console.log("🔁 user state changed:", user);
//   }, [user]);

  // return (
//     <div className="flex h-screen">
//       {/* Left Sidebar */}
//       <div className="w-64 bg-gray-800 text-white p-4">
//         <h2 className="text-xl font-bold mb-4">Welcome, {user?.name}</h2>
//         <ul>
       
//       {user?.systems ? Object.values(user.systems).map((deviceArray, index) => (
//         deviceArray.map((device, deviceIndex) => (
//           <li key={deviceIndex} className="mb-2">{device.platform}</li>
//         ))
//       )) : <p>No systems available</p>}
//         </ul>
//       </div>

//       {/* Right Content */}
//       <div className="flex-1 p-6 bg-gray-100">
//         <h1 className="text-2xl font-semibold mb-4">Your Systems</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
       

//         {user?.systems ? Object.values(user.systems).map((deviceArray, index) => (
//         deviceArray.map((device, deviceIndex) => (
//           <div key={deviceIndex} className="bg-white p-4 rounded shadow">
//             <h3 className="text-lg font-bold">{device.platform}</h3>
//             <p className="text-gray-600">System ID: {device.systemId}</p>
//           </div>
//         ))
//       )) : <p>No systems available</p>}
//         </div>
//       </div>
//     </div>
// );
// };

return (
  <div className="dashboard-container">
    {/* Left Sidebar */}
    <div className="sidebar">
      <h2 className="welcome-title">Welcome, {user?.name}</h2>
      <ul>
        {user?.systems
          ? Object.values(user.systems).map((deviceArray, index) =>
              deviceArray.map((device, deviceIndex) => (
                <li key={deviceIndex} className="device-item">
                  {device.platform}
                </li>
              ))
            )
          : <p>No systems available</p>}
      </ul>
      <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
    </div>

    {/* Right Content */}
    <div className="main-content">
      <h1 className="section-title">Your Systems</h1>
      <div className="systems-grid">
        {user?.systems
          ? Object.values(user.systems).map((deviceArray, index) =>
              deviceArray.map((device, deviceIndex) => (
                <div key={deviceIndex} className="system-card">
                  <h3 className="system-title">{device.platform}</h3>
                  <p className="system-id">System ID: {device.systemId}</p>
                </div>
              ))
            )
          : <p>No systems available</p>}
      </div>
    </div>
  </div>
);
};

  


export default Dashboard









// import { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/auth/me", {
//           withCredentials: true,
//         });
//         console.log("✅ API res.data:", res.data);
//         setUser(res.data);
//       } catch (error) {
//         console.error("❌ API error:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     console.log("🔁 user state changed:", user);
//   }, [user]);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {user ? (
//         <div>
//           <p>Name: {user.name}</p>
//           <p>Email: {user.email}</p>
//         </div>
//       ) : (
//         <p>Loading user...</p>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
