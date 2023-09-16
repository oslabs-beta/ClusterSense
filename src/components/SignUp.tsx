import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEInput, TERipple } from 'tw-elements-react';
import logo from '../assets/ClusterSense.png';
import logoFour from '../assets/ClusterSenseBigger.png';
import TextField from '@mui/material/TextField';

const SignUp = ({ showSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toHome = () => {
    const path = "/home";
    navigate(path);
  };

  const handleClick = async () => {
    try {
      const body = { username, password };
      const data = await fetch(`http://localhost:4000/login/signupRequest`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (data.ok) {
        console.log(data);
        toHome();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const goLogin = () => {
    showSignIn();
  };

  return (
    <div className="h-screen bg-white">
      <div className="flex items-center justify-center h-full">
        <div className="flex w-full h-full text-black">
          <div className="lg:w-6/12 p-6">
            <div className="text-center">
              <img className="mx-auto w-48" src={logoFour} alt="" />
            </div>
            <div className="signInContainer">
              <div className="signInBox mb-4">
                <TextField id="outlined-basic" sx={{ width: '100%' }} label="username" variant="outlined" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br /><br />
                <TextField id="outlined-basic" sx={{ width: '100%' }} label="password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
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
                <div className="flex items-center justify-between pb-6">
                  <p className="mb-0 mr-2">Already have an account?</p>
                  <TERipple rippleColor="light">
                  <button
                              type="button"
                              onClick={goLogin}
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                      Login
                    </button>
                  </TERipple>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:w-6/12" style={{ background: 'linear-gradient(to left, #3D2F91, #89278D)' }}>
            <div className="px-4 py-6 text-white">
              <h4 className="mb-6 text-xl font-semibold">
                Kafka Cluster Management Tool
              </h4>
              <p className="text-sm">
                An intuitive and feature-rich GUI that simplifies Kafka cluster management, monitoring, and interaction to streamline operations and efficiency when working with Kafka clusters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
