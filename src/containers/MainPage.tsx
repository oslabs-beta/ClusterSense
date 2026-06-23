import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Chart from '../components/Chart.tsx';
import PortForm from '../components/PortForm';

const MainPage = () => {
  const navigate = useNavigate();

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
          <div className="flex flex-col justify-center items-center content-center p-20">
            <div className="flex justify-center gap-x-20 flex-wrap w-screen p-8">
              <div className="w-1/4 h-1/3">
                <Chart
                  port={port}
                  query="kafka_server_replicamanager_underreplicatedpartitions"
                  title="Under Replicated Partitions"
                />
              </div>
              <div className="w-1/4 h-1/3">
                <Chart
                  port={port}
                  query="kafka_controller_kafkacontroller_globaltopiccount"
                  title="Topics"
                />
              </div>
              <div className="w-1/4 h-1/3">
                <Chart
                  port={port}
                  query="process_cpu_seconds_total"
                  title="CPU Usage"
                />
              </div>
            </div>
            <div className="flex items-center justify-evenly gap-x-20 p-24 mt-10 flex-wrap w-screen">
              <div className="w-1/4 h-1/4">
                <Chart
                  port={port}
                  query="kafka_server_brokertopicmetrics_bytesin_total"
                  title="Bytes In"
                />
              </div>
              <div className="w-1/4 h-1/4">
                <Chart
                  port={port}
                  query="kafka_server_brokertopicmetrics_bytesout_total"
                  title="Bytes Out"
                />
              </div>
            </div>
          </div>
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