import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Summarypage.css"

export default function Summarypage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    try {
      await axios.post('/api/register', state);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      alert('Error during registration.');
    }
  };

  return (
    <div className="summary-container">
      <h2>Review Your Information</h2>

      <div className="summary-block">
        <h3>User Details</h3>
        <p><strong>Name:</strong> {state.name}</p>
        <p><strong>Email:</strong> {state.email}</p>
      </div>

      <div className="summary-block">
        <h3>Devices</h3>
        {state.devices.map((device, index) => (
          <div key={index} className="device-summary">
            <p><strong>Platform:</strong> {device.platform}</p>
            <p><strong>System ID:</strong> {device.systemId}</p>
            <p><strong>User ID:</strong> {device.deviceUserId}</p>
            <p><strong>Password:</strong> ****</p>
          </div>
        ))}
      </div>

      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={handleFinalSubmit} className="submit-btn">Confirm & Submit</button>
    </div>
  );
}