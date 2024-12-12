import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled, { createGlobalStyle } from 'styled-components';
import image from './../../assets/image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import Eye icons

// Styled Components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #8beca0 0%, #a095e2 100%);
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: row; 
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 80%; 
  max-width: 1200px; 
`;

const LoginForm = styled.div`
  padding: 2rem;
  width: 50%; 
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #a3ec8b 0%, #0056b3 100%);
  -webkit-background-clip: text; 
  background-clip: text;
  color: transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  text-align: left;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; 
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex; 
  align-items: center; 

  input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 0.5rem; 
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box; 
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const LoginImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1; 
  overflow: hidden; 

  img {
    width: 100%; 
    height: auto;
    object-fit: cover; 
  }
`;

// Media Queries for responsiveness
const mediaQueries = `
  @media (max-width: 768px) {
    ${LoginContent} {
      flex-direction: column; 
      width: 90%; 
    }

    ${LoginForm} {
      width: 100%; 
      padding: 1rem;
    }

    ${LoginImage} {
      display: block; 
      width: 100%; 
      height: 200px; 
    }

    ${LoginImage} img {
      width: 100%; 
      height: auto; 
    }
  }

  @media (max-width: 480px) {
    ${Title} {
      font-size: 1.2rem; 
    }

    ${InputGroup} input {
      font-size: 0.9rem; 
    }

    ${SubmitButton} {
      padding: 0.5rem; 
      font-size: 0.9rem; 
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${mediaQueries}
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault(); 
    setMessage('');

    if (!username) {
      setMessage('Username is required.');
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      setMessage('Username can only contain alphanumeric characters.');
      return;
    }

    if (username.length < 4) {
      setMessage('Username must be at least 4 characters long.');
      return;
    }

    if (!password) {
      setMessage('Password is required.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setMessage('Password must be at least 6 characters long, including an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }

    setMessage('Login successful!');
    navigate('/home'); 
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <GlobalStyle />
      <LoginContainer>
        <LoginContent>
          <LoginForm>
            <Title>STORE PORTAL</Title>
            {message && <div>{message}</div>}
            <form onSubmit={handleLogin}>
              <InputGroup>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <label htmlFor="password">Password:</label>
                <PasswordWrapper>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <PasswordToggle onClick={handleTogglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </PasswordToggle>
                </PasswordWrapper>
              </InputGroup>
              <SubmitButton type="submit">Login</SubmitButton>
            </form>
          </LoginForm>
          <LoginImage>
            <img src={image} alt="Login Visual" />
          </LoginImage>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default Login;
