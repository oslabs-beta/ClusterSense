import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEInput, TERipple } from 'tw-elements-react';
import logo from '../assets/ClusterSense.png';
import logoFour from '../assets/ClusterSenseBigger.png';
import TextField from '@mui/material/TextField';

const SignUp = ({ showSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const goLogin = () => {
    // const path = '/';
    // navigate(path);
    showSignIn();
  };
  const toHome = () => {
    const path = '/home';
    navigate(path);
  };

  const handleClick = async () => {
    try {
      const body = {
        username: username,
        password: password,
      };
      const data = await fetch(`http://localhost:4000/login/signupRequest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (data.ok) {
        toHome();
      } else if (data.status === 400) {
        // Display a user-friendly error message here
        setError('All fields are required');
      } else if (data.status === 409) {
        // Display a user-friendly error message here
        setError('Username already exists!');
      } else {
        // Handle other error cases
        console.log(data);
        setError('Unable to create user. Please try again!');
      }
    } catch (err) {
      //render error in front end
      console.log(err);
      setError('An error occurred.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '100vh',
      }}
      // className="magic"
    >
      <div className="container flex items-center justify-center h-screen p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-black">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg bg-white0">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* //Left column container */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        style={{ width: '60%' }}
                        src={logoFour}
                        alt=""
                      />
                      {/* <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Welcome to ClusterSense
                        </h4> */}
                    </div>
                    <div className="signInContainer">
                      {/* <h2>Sign In:</h2> */}
                      <div className="signInBox mb-4 ">
                        <TextField
                          id="outlined-basic"
                          sx={{ width: '100%' }}
                          label="username"
                          variant="outlined"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <TextField
                          id="outlined-basic"
                          sx={{ width: '100%' }}
                          label="password"
                          variant="outlined"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>
                        <br></br>
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <TERipple rippleColor="light" className="w-full">
                            <button
                              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              style={{
                                background:
                                  'linear-gradient(to left, #3D2F91, #89278D)',
                              }}
                              onClick={handleClick}
                            >
                              Register
                            </button>
                          </TERipple>

                        </div>
                        {error && (
                          <div
                            className="error-message"
                            style={{ color: 'red', fontStyle: 'italic' }}
                          >
                            {error}
                          </div>
                        )}

                        {/* // Register button */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Have an account?</p>
                          <TERipple rippleColor="light">
                            <button
                              type="button"
                              onClick={goLogin}
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 "
                            >
                              Login
                            </button>
                          </TERipple>
                        </div>

                        {/* <button onClick={Submit}>Sign In</button> */}
                        {/* <p>Don't have an account?</p> */}
                        {/* <button onClick={toSignUp}>Sign Up</button>  */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="signInPage">
    //   <div className="signInContainer">
    //     <h2>Sign Up:</h2>
    //     <div className="signInBox">
    //         <input name="username" type="text" placeholder="username" value = {username} onChange={(e) => setUsername(e.target.value)}/>
    //         <input name="password" type="password" placeholder="password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
    //         <button onClick={handleClick}>Sign Up</button>
    //         <button onClick={goLogin}>Back to Log In</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SignUp;
