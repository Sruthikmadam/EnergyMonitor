import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registerpage() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/summary', { state: formData });
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
      {/* ...inputs... */}
      <button type="submit" className="submit-btn">Review Summary</button>
    </form>
  );
}
