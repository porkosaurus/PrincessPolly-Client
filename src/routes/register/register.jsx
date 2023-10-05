import React, { useState, useContext } from 'react';
import './register.scss';
import { AuthContext } from '../../utilities/authContext';
import { useNavigate } from 'react-router-dom'; 

import registerImage from '../../images/US_Block_4_db859d88-a942-48b9-8648-e8a57f3bab1f_950x.progressive.jpg';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null); // Add error state

  const ctx = useContext(AuthContext);

  function handleInputChange(event) {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Reusable function for cart and bookmark operations
  const performOperation = async (operationName) => {
    try {
      const userDataResponse = await fetch(`https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/userdata?username=${formData.username}`, {
        method: 'GET',
        headers: {}
      });
      const userData = await userDataResponse.json();
      const { userId } = userData;

      const operationResponse = await fetch(`https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/${operationName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, userId: userId }),
      });

      if (operationResponse.ok) {
        console.log(`${operationName} data sent to the server`);
      } else {
        const errorData = await operationResponse.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.log(`Error performing ${operationName}:`, error);
    }
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors
    const registrationResponse = await fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (registrationResponse.ok) {
      // Registration was successful, now perform automatic login
      const response = await fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      if (response.ok) {
        ctx.setIsAuthenticated(true);
        ctx.setUser(formData.username);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', formData.username);

        // Perform cart operation
        await performOperation('cart');

        // Perform bookmark operation
        await performOperation('bookmark');

        navigate("/")
      } else {
        const errorData = await response.json();
        setError(errorData.error); // Set the error message
      }
    } else {
      setError('Registration failed. Please try again.'); // Set the error message
    }
  };

  return (
    <div className="auth-page-container">
      <a href="/" className="auth-page-back-button">
        &lt;-- Go back home{' '}
      </a>
      <div className="auth-page-form">
        <div className="form-container">
          <form className="auth-form" onSubmit={handleRegistration}>
            <h2 className="form-header">Register for Princess Polly</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            <div className="input-container">
              <label className="auth-form-label">
                Username:
                <input
                  className="auth-form-input"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="input-container">
              <label className="auth-form-label">
                Email:
                <input
                  className="auth-form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="input-container">
              <label className="auth-form-label">
                Password:
                <input
                  className="auth-form-input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <button className="auth-form-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div
        className="auth-page-image"
        style={{ backgroundImage: `url(${registerImage})` }}
      ></div>
    </div>
  );
};

export default Register;
