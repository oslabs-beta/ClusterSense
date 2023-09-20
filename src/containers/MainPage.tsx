import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MouseEvent from 'react';
import NavBar from '../components/NavBar';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
const MainPage = () => {

  const navigate = useNavigate();

  const toLogin = () => {
    const path: string = '/';
    navigate(path);
  }

  //**** */
  const [clusterOptions, setClustersOptions] = useState([]);
  const [port, setPort] = useState();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  //const [dataFromDatabase, setDataFromDatabase] = useState([]);

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
        const updatedClusters = [...clusterOptions, { value: port.toString(), label: port.toString() }];
        setClustersOptions(updatedClusters);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // useEffect that will fetch data from prometheus/backend once the form is submitted using the port
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let response = await fetch('/data');
  //       if (response.ok) {
  //         response = await response.json();
  //         //setDataFromDatabase(response);
  //       } else {
  //         //error fetching data
  //       }
  //     } catch (error) {
  //       // network error
  //     }
  //   };
  //   if (isFormSubmitted) {
  //     fetchData();
  //   }
  // }, [isFormSubmitted]);

  //useEffect to check if cookies exist
  useEffect(() => {
    const checkSession = async () => {
      try {
        const isAuthenticated = await fetch('/login/verify')
        const status=await isAuthenticated.json()
        if (status.status===false) {
          toLogin()
        } 
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    checkSession();
  }, []);



  return (
    <div>
      <NavBar setPort={setPort} formStatus={isFormSubmitted} formSubmission={setIsFormSubmitted} clusterOptions={clusterOptions}
  setClustersOptions={setClustersOptions}/>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}className="h-screen bg-neutral-200">
          {isFormSubmitted ? (
            <div>
              <iframe
                src = 'http://localhost:3000/d/df922d9d-6417-4611-8f4d-03e7172488c8/kafka2?orgId=1&from=1694722915484&to=1694723215484'
              ></iframe>
            </div>
          ) : (
            <Container maxWidth="md" style={{ backgroundColor: 'white', margin : '2rem', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)' }}>
              <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}> Welcome to your ClusterSense Dashboard!</h1>
              <br></br>
              <form onSubmit={handleSubmission}>
                  <div className="flex flex-direction= row items-center pb-6">
                    <p className="mb-0 mr-2" style={{ fontSize: '1.2rem' }}>Enter your JMX port for your Kafka Cluster: </p>
                            {/* <span>Enter your JMX port for you Kafka Cluster: </span> */}
                    <TextField
                      className="port"
                      type="text"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                    />
                  </div>
                  <div>
                    <Button variant="contained" type="submit">Submit</Button>
                  {/* <button type="submit">Submit</button> */}
                  </div>
              </form>
            </Container>
          )
        }
        </div>
    </div>
    // </Container>
  );
};

export default MainPage;
