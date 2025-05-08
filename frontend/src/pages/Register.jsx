import { useState } from 'react';
// import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';


export default function Register() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    devices: [{ platform: '', systemId: '', deviceUserId: '', devicePassword: '' }]
  });

  const handleDeviceChange = (index, e) => {
    const newDevices = [...formData.devices];
    newDevices[index][e.target.name] = e.target.value;
    setFormData({ ...formData, devices: newDevices });
  };

  const addDevice = () => {
    setFormData({
      ...formData,
      devices: [...formData.devices, { platform: '', systemId: '', deviceUserId: '', devicePassword: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', formData);
      navigate('/login', { state: formData });
      // navigate('/login');

      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed!');
       console.error('Registration error:', error); // Log full error
  // res.status(500).json({ error: error.message }); // Return message to frontend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
      <div className='register-box'>
    <div className='userDetails'>
      <h3>User Details</h3>
      <input type="text" name="name" placeholder="Full Name" required
        onChange={e => setFormData({ ...formData, name: e.target.value })} />

      <input type="email" name="email" placeholder="Email" required
        onChange={e => setFormData({ ...formData, email: e.target.value })} />

      <input type="password" name="password" placeholder="Password" required
        onChange={e => setFormData({ ...formData, password: e.target.value })} />
</div>
<div className='devices'>
      <h3>Energy Monitoring Devices</h3>
      {formData.devices.map((device, index) => (
        <div key={index} className="device-section">
          <input type="text" placeholder="Platform" name="platform"
            value={device.platform} onChange={e => handleDeviceChange(index, e)} />
          <input type="text" placeholder="System ID" name="systemId"
            value={device.systemId} onChange={e => handleDeviceChange(index, e)} />
          <input type="text" placeholder="Device User ID" name="deviceUserId"
            value={device.deviceUserId} onChange={e => handleDeviceChange(index, e)} />
          <input type="password" placeholder="Device Password" name="devicePassword"
            value={device.devicePassword} onChange={e => handleDeviceChange(index, e)} />
        </div>
        
      ))}
</div>
</div>
<div className='buttons'>
      <button type="button" className="add-btn" onClick={addDevice}>+ Add Another Device</button>
      <button type="submit" className="submit-btn">Register</button></div>
    </form>
  );
}
