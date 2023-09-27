import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MouseEvent from 'react';
import NavBar from '../components/NavBar';
import MeetTeam from '../components/MeetTeam';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
// import Iframe from 'react-iframe';
import Chart from '../components/Chart.tsx';

const MainPage = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    const path: string = '/';
    navigate(path);
  };

  //**** */
  const [clusterOptions, setClustersOptions] = useState([]);
  const [port, setPort] = useState();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmission = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      //this will put the cluster into the database
      const numPort = Number(port);
      const data = { port: numPort };
      const response = await fetch('http://localhost:4000/cluster', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsFormSubmitted(true);
        const updatedClusters = [
          ...clusterOptions,
          { value: port.toString(), label: port.toString() },
        ];
        setClustersOptions(updatedClusters);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // useEffect that will fetch data from prometheus/backend once the form is submitted using the port

  const getMetricData = async (metric: string) => {
    if (!metricList.includes(metric)) return setMetricData([]);
    try {
      const response = await axios.get(
        `http://${server}/api/v1/query?query=${metric}`
      );
      setMetricData(response.data.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  //useEffect to check if cookies exist
  useEffect(() => {
    const checkSession = async () => {
      try {
        const isAuthenticated = await fetch('/login/verify');
        const status = await isAuthenticated.json();
        if (status.status === false) {
          toLogin();
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    checkSession();
  }, []);

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
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // height: '100vh',
        }}
        className="h-screen bg-neutral-200"
      >
        {isFormSubmitted ? (
          <div className="flex flex-col justify-center items-center align-content p-20">
            <div className="flex justify-center gap-x-20 flex-wrap w-screen p-30">
              <div className="w-1/4 h-1/3" >
                {/* <h2>Under Replicated Partitions</h2> */}
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
              className="flex items-center justify-evenly
             gap-x-20 p-24 mt-300 flex-wrap w-screen"
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
              // display: 'flex',
              // justifyContent: 'center',
              // alignItems: 'center',
              // height: '100vh',
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
            <br></br>
            <form onSubmit={handleSubmission}>
              <div className="flex flex-direction= row items-center pb-6">
                <p className="mb-0 mr-2" style={{ fontSize: '1.2rem' }}>
                  Enter your JMX port for your Kafka Cluster:{' '}
                </p>
                {/* <span>Enter your JMX port for you Kafka Cluster: </span> */}
                <TextField
                  className="port"
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                />
              </div>
              <div>
                <Button variant="contained" type="submit" className='gradient-background'>
                  Submit
                </Button>
                {/* <button type="submit">Submit</button> */}
              </div>
            </form>
          </Container>
        )}
      </div>
    </div>
    // </Container>
  );
};

export default MainPage;