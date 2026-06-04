import { useNavigate } from 'react-router-dom';
import { useState, useEffect, MouseEvent } from 'react';
import NavBar from '../components/NavBar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import Chart from '../components/Chart.tsx';

const MainPage = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    const path: string = '/';
    navigate(path);
  };

  const [clusterOptions, setClustersOptions] = useState<{value: string, label: string}[]>([]);
  const [port, setPort] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePortSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const portNumber = Number(port);
      const payload = { port: portNumber };
      const response = await fetch('/cluster', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setIsFormSubmitted(true);
        setClustersOptions([
          ...clusterOptions,
          { value: port.toString(), label: port.toString() },
        ]);
      } else {
        setError('Failed to save cluster. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  //useEffect to check if cookies exist
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/login/verify');
        const { status } = await response.json();
        if (status === false) {
          toLogin();
        }
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
      <div
        className="flex justify-center items-center h-screen bg-neutral-200"
      >
        {isFormSubmitted ? (
          <div className="flex flex-col justify-center items-center content-center p-20">
            <div className="flex justify-center gap-x-20 flex-wrap w-screen p-8">
              <div className="w-1/4 h-1/3" >
                <Chart
                  port={port}
                  query="kafka_server_replicamanager_underreplicatedpartitions"
                  title={"Under Replicated Partitions"}
                />
              </div>
              <div className="w-1/4 h-1/3">
                <Chart
                  port={port}
                  query="kafka_controller_kafkacontroller_globaltopiccount"
                  title={"Topics"}
                />
              </div>
              <div className="w-1/4 h-1/3">
                <Chart port={port} 
                query="process_cpu_seconds_total" 
                title={"CPU Usage"}
                />
              </div>
            </div>
            <div
              className="flex items-center justify-evenly gap-x-20 p-24 mt-10 flex-wrap w-screen"
            >
              <div className="w-1/4 h-1/4">
                <Chart
                  port={port}
                  query="kafka_server_brokertopicmetrics_bytesin_total"
                  title={"Bytes In"}
                />
              </div>
              <div className="w-1/4 h-1/4 ">
                <Chart
                  port={port}
                  query="kafka_server_brokertopicmetrics_bytesout_total"
                  title={"Bytes Out"}
                />
              </div>
            </div>
          </div>
        ) : (
          <Container
            maxWidth="md"
            style={{
              backgroundColor: 'white',
              margin: '2rem',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              {' '}
              Welcome to your ClusterSense Dashboard!
            </h1>
            <h1 className="mb-4">...</h1>
            <form onSubmit={handlePortSubmit}>
              <div className="flex flex-row items-center pb-6">
                <p className="mb-0 mr-2" style={{ fontSize: '1.2rem' }}>
                  Enter your JMX port for your Kafka Cluster:{' '}
                </p>
                <TextField
                  className="port"
                  type="text"
                  value={port}
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPort(e.target.value)}
                />
              </div>
              <div>
                <Button variant="contained" type="submit" className='gradient-background'>
                  Submit
                </Button>
              </div>
            </form>
          </Container>
        )}
      </div>
    </div>
  );
};

export default MainPage;