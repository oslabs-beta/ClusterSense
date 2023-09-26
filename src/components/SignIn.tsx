import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEInput, TERipple } from 'tw-elements-react';
import TextField from '@mui/material/TextField';

// import logo from '../assets/ClusterSense.png';
// import logoTwo from '../assets/CS-outline.png';
import logoThree from '../assets/ClusterSense.png';
import logoFour from '../assets/ClusterSenseBigger.png';


const SignIn = ({ showSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //navigation paths
  const navigate = useNavigate();
  // const toSignUp = () => {
  //   const path = '/signup';
  //   navigate(path);
  // };
  const toHome = () => {
    const path = '/home';
    navigate(path);
  };

  const Submit = async () => {
    try {
      const data = {
        username: username,
        password: password,
      };
      const response = await fetch(`http://localhost:4000/login/loginRequest`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toHome();
      } else if (response.status === 400) {
        // Display a user-friendly error message here
        setError('All fields are required');
      } else if (response.status === 409 || response.status === 401) {
        // Display a user-friendly error message here
        setError('Invalid username or password');
      } else {
        // Handle other error cases
        console.log(response)
        setError('An error occurred.');
      }
    } catch (err) {
      // Handle network errors or other unexpected issues
      console.error(err);
      setError('An error occurred.');
    }
  };
  // Use the passed function to navigate to SignUp form
const toSignUp = () => {
  showSignUp();
};

return (
<div>
<div className = "flex justify-center items-center" style={{ width: '100%'}}>
    <div className="signIn-up" style={{ maxWidth: '1000px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}>
    <h2 className = "font-bold pb-4" >Login</h2>
      <TextField id="outlined-basic" 
        sx={{width: '100%', mb: 4}} 
        label="username" 
        variant="outlined" 
        type="text" 
        value={username} onChange={(e) => setUsername(e.target.value)}/>
  
      <TextField id="outlined-basic" 
       sx={{width: '100%', mb: 4}}  
      label="password" 
      variant="outlined" 
      type = "password" 
      value={password} onChange={(e) => setPassword(e.target.value)}/>
      <div className="mb-12 pb-1 pt-1 text-center">
        <TERipple rippleColor="light" className="w-full">
          <button
            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] gradient-background"
            type="button"
            onClick={Submit}
          >
            Log in
          </button>
        </TERipple>
      </div>
      {error && <div className="error-message" style={{ color: 'red', fontStyle: 'italic' }}>{error}</div>}

      {/* // Register button */}
      <div className="flex items-center justify-between pb-6">
        <p className="mb-0 mr-2">Don't have an account?</p>
        <TERipple rippleColor="light">
          <button
            type="button"
            onClick={toSignUp}
            className="button-color"
          >
            Register
          </button>
        </TERipple>
      </div>                  
    </div>
  </div>
</div>
);
};

export default SignIn;
