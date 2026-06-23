import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';
import TextField from '@mui/material/TextField';

interface SignUpProps {
  showSignIn: () => void;
}

const SignUp = ({ showSignIn }: SignUpProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toHome = () => navigate('/home');

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/login/signupRequest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toHome();
      } else {
        // Read the actual error message from the server
        const body = await response.json();
        setError(body.error || 'Unable to create user. Please try again!');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred.');
    }
  };

  return (
    <div className="flex justify-center items-center" style={{ width: '100%' }}>
      <div className="signIn-up pr-20" style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="font-bold pb-4">Sign Up</h2>
        <div className="signInBox mb-4">
          <TextField
            id="outlined-basic"
            sx={{ width: '100%', mb: 4 }}
            label="username"
            variant="outlined"
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            sx={{ width: '100%', mb: 4 }}
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
          <div className="mb-12 pb-1 pt-1 text-center">
            <TERipple rippleColor="light" className="w-full">
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] gradient-background"
                type="button"
                onClick={handleSubmit}
              >
                Register
              </button>
            </TERipple>
          </div>
          {error && (
            <div className="error-message" style={{ color: 'red', fontStyle: 'italic' }}>
              {error}
            </div>
          )}
          <div className="flex items-center justify-between pb-6">
            <p className="mb-0 mr-2">Have an account?</p>
            <TERipple rippleColor="light">
              <button
                type="button"
                onClick={showSignIn}
                className="button-color"
              >
                Login
              </button>
            </TERipple>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;