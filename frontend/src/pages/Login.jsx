// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../auth";
// import './Login.css'

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async(e) => {
//     e.preventDefault();
//     try {
//         const res = await axios.post("http://localhost:3001/api/login", {
//           email,
//           password,
//         });
  
//         // Set cookie from API token
//         const token = res.data.token;
//         document.cookie = `token=${token}; path=/; max-age=86400`; // 1 day
  
//         navigate("/dashboard");
//       } catch (error) {
//         alert("Login failed: " + error.response?.data?.message || error.message);
//       }
//     };
  

//   return (
//     // <div className="h-screen flex items-center justify-center bg-gray-100">
//     //   <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
//     //     <h2 className="text-2xl font-bold mb-4">Login</h2>
//     //     <input
//     //       type="email"
//     //       placeholder="Email"
//     //       className="w-full p-2 border mb-3"
//     //       onChange={(e) => setEmail(e.target.value)}
//     //     />
//     //     <input
//     //       type="password"
//     //       placeholder="Password"
//     //       className="w-full p-2 border mb-3"
//     //       onChange={(e) => setPassword(e.target.value)}
//     //     />
//     //     <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
//     //   </form>
//     // </div>
//     <div className="login">
//     <div className="login-container">
//     <form onSubmit={handleLogin} className="login-form">
//       <h2 className="login-title">Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         className="login-input"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         className="login-input"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button className="login-button">Login</button>
//     </form>
//   </div>
//   </div>
  
//   );
// };

// export default Login;


import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import regimg from '../assets/environment.webp'
import './Login.css'
import axios from '../utils/axios';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      const response = await axios.post('/auth/login', { email, password })
      console.log(response)

      if (response.status == 200) {
        navigate('/dashboard');
        // window.location.reload();
      }
      setLoading(false);

     } catch (err){
      console.log(err.response.data.errors);
      const errors=err.response.data.errors;
      setError(errors.email||errors.password|| "Login failed")}
   
  };

  return (
    <div className='login'>
    <div className='login-container'>
     
      <div className='login-form '>
        <h2 className='login-title'>Login</h2>
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='flex-d errorr'>{error && <p style={{ color: "red" ,lineHeight: "2" }}>{error}</p>}</div>
          
          <button className="btn btn-primary">Login
          </button> 

          <span 
            onClick={() => navigate("/register")} 
            style={{ color: "white", textDecoration: "underline", cursor: "pointer", marginLeft:"100px"}}
          >
          Not registered?
          </span>
        </form>
      </div>
      
      </div>
      </div>
  );
}

export default Login;
