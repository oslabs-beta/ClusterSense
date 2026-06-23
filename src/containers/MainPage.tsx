import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import PortForm from '../components/PortForm';
import Dashboard from '../components/Dashboard';
import useSessionTimeout from '../hooks/useSessionTimeout';

const MainPage = () => {
  const navigate = useNavigate();
  useSessionTimeout();

  const [clusterOptions, setClustersOptions] = useState<{ value: string; label: string }[]>([]);
  const [port, setPort] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Submits port to server — returns true on success, false on failure
  const handlePortSubmit = async (port: string): Promise<boolean> => {
    try {
      const response = await fetch('/cluster', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ port: Number(port) }),
      });
      if (response.ok) {
        setIsFormSubmitted(true);
        setClustersOptions((prev) => [
          ...prev,
          { value: port, label: port },
        ]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  // Redirect to login if session is invalid
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/login/verify');
        const { status } = await response.json();
        if (status === false) navigate('/');
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    checkSession();
  }, [navigate]);

  return (
    <div>
      <NavBar
        setPort={setPort}
        formStatus={isFormSubmitted}
        formSubmission={setIsFormSubmitted}
        clusterOptions={clusterOptions}
        setClustersOptions={setClustersOptions}
      />
      <div className="flex justify-center items-center h-screen bg-neutral-200">
        {isFormSubmitted ? (
          <Dashboard port={port} />
        ) : (
          <PortForm
            port={port}
            setPort={setPort}
            onSubmit={handlePortSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
