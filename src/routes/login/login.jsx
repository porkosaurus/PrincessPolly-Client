import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../utilities/authContext';
import { useNavigate } from 'react-router-dom'; 
import './login.scss'
import loginImage from '../../images/US_Block_3_f7e50485-09d2-42a1-874e-47d06f629740_950x.progressive.webp'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null); // Add error state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const ctx = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors
    const response = await fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      const username = formData.username;
      ctx.setIsAuthenticated(true);
      ctx.setUser(username);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      window.location.href = '/'
    } else {
      const errorData = await response.json();
      setError(errorData.error); // Set the error message
    }
  };

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedIsAuthenticated === 'true') {
      ctx.setIsAuthenticated(true);
    }
  }, []);

  // Rest of your code...

  return (
    <div>
      {ctx.isAuthenticated === true ? (
        <p>You are already logged in</p>
      ) : (
        <div className='auth-page-container'>
          <a href="/" className='auth-page-back-button'>&lt;-- Go back home</a>
          <div className='auth-page-form'>
            <div className='form-container'>
              <form className='auth-form' onSubmit={handleSubmit}>
                <h2 className='form-header'>Login to Princess Polly</h2>
                {error && <p className="error-message">{error}</p>} {}
                <div className='input-container'>
                  <label className='auth-form-label'>
                    Username:
                    <input className='auth-form-input' type="text" name="username" value={formData.username} onChange={handleInputChange} />
                  </label>
                </div>
                <div className='input-container'>
                  <label className='auth-form-label'>
                    Password:
                    <input className='auth-form-input' type="password" name="password" value={formData.password} onChange={handleInputChange} />
                  </label>
                </div>
                <button className='auth-form-button' type="submit">Submit</button>
              </form>
            </div>
          </div>
          <div className='auth-page-image' style={{ backgroundImage: `url(${loginImage})` }}></div>
        </div>
      )}
    </div>
  );
};

export default Login;
