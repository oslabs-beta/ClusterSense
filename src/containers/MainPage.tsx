import React, { useState, useEffect } from 'react';
import MouseEvent from 'react';
import NavBar from '../components/NavBar';
import TextField from '@mui/material/TextField';
// import Button from 
const MainPage = () => {
  //**** */
  const [clusterOptions, setClustersOptions] = useState([]);
  //need to check if user is logged in
/*
There is a bunch of logic in here for dataFromDatabase--this is theory and reflects what might come from the prometheus data scrapper to be manifested as grafana charts
*/
  const [port, setPort] = useState();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  //const [dataFromDatabase, setDataFromDatabase] = useState([]);

  const handleSubmission = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      //this will put the cluster into the database
      const numPort=Number(port);
      const data = {port: numPort}
      const response = await fetch('http://localhost:4000/cluster', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if(response.ok){
        setIsFormSubmitted(true);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  //useEffect that will fetch data from prometheus/backend once the form is submitted using the port
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('/data');
        if (response.ok) {
          response = await response.json();
          //setDataFromDatabase(response);
        } else {
          //error fetching data
        }
      } catch (error) {
        // network error
      }
    };
    if (isFormSubmitted) {
      fetchData();
    }
  }, [isFormSubmitted]);

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
              {'hello' /*grafana interface */}
            </div>
          ) : (
            // <div style={{
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            //   height: '100vh',
            // }}className="h-screen bg-neutral-200">
              <div className="clusterForm flex items-center justify-center h-screen p-10">
              <div className="g-6 flex h-full flex-wrap items-center justify-center text-black">
                <div className="w-full">
                  <div className="block rounded-lg bg-white shadow-lg bg-white0">
                    <div className="g-0 lg:flex lg:flex-wrap">
                      <div className="px-4 md:px-0">
                        <form onSubmit={handleSubmission}>
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Enter your JMX port for your Kafka Cluster: </p>
                            {/* <span>Enter your JMX port for you Kafka Cluster: </span> */}
                            <TextField
                              className="port"
                              type="text"
                              value={port}
                              onChange={(e) => setPort(e.target.value)}
                            />
                          </div>
                          <div>
                            <button type="submit">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        </div>
    </div>
  );
};

export default MainPage