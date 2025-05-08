// import { useState } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
 import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Summary1 from "./pages/Summary1";
// import Summarypage from "./pages/Summarypages";
import Register from "./pages/Register";


// import { isAuthenticated } from "./auth";

// function App() {
 

//   return (
//     <BrowserRouter>
//     <Routes>
//       {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/" element={<Login />} />
//       <Route path="/login" element={<Login />} />

//       <Route path="/summary" element={<Summary1 />} />
//       <Route path="/summarypage" element={<Summarypage />} />
//       <Route path="/register" element={<Register />} />

//       {/* <Route path="/dashboard"
//               element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
//   /> */}
//       </Routes>
//       </BrowserRouter>
//   )
// }

// export default App


 


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Function to check authentication status
  //   const checkAuthStatus = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/auth/check-auth', {
  //         method: 'GET',
  //         credentials: 'include', // This ensures the cookie is sent with the request
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data.isAuthenticated) {
  //           setIsAuthenticated(true);
  //         }
  //       } else {
  //         setIsAuthenticated(false);
  //       }
  //     } catch (error) {
  //       console.error('Error checking authentication status:', error);
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   checkAuthStatus();
  // }, []);

 
useEffect(() => {
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/auth', {
        withCredentials: true, // Ensures HttpOnly cookies are sent
      });

      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setIsAuthenticated(false);
    }
  };

  checkAuthStatus();
}, []);

  return (
    <Router>
      {isAuthenticated ? (
        <div>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}
