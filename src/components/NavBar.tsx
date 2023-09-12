// import useEffect from 'react';
// import useState from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ClusterSense.png';
import Select from 'react-select/async';

interface NavProps {
  setPort: (e: number) => void;
  formSubmission: (e: boolean) => void;
}

const NavBar = ({ setPort, formSubmission }: NavProps) => {
  const [clusterOptions, setClustersOptions] = useState([]);

  //navigation paths
  const navigate = useNavigate();
  const toHome = () => {
    const path: string = '/home';
    navigate(path);
  };
  const signOut = () => {
    const path: string = '/login';
    navigate(path);
    //need to ensure we end the session here so they actually log out and aren't just redirected
  };

  function handleSelect(selectedOption: number) {
    //uses setPort /formSubmission from props to set port in the mainPage, making form go away
    const chosenCluster = selectedOption;
    // console.log('chosenCluster')
    setPort(chosenCluster);
    formSubmission(true);
  }

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await fetch('http://localhost:4000/cluster/DB', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          const convertData=data.map((cluster) => {
            const value = cluster.cluster_port.toString();
            const label = cluster.cluster_port.toString()
            return {value: value, label: label}
          });
          console.log(convertData)
          await setClustersOptions(convertData);
          console.log('state ', clustersOptions)
        } else {
          console.error('Error fetching clusters');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchClusters();
  }, []);



  // Select Cluster:
  // <Select
  //   onChange={handleSelect}
  //   options={clusterOptions}

  // />

  return (
    <div className="nav-bar">
      <div className="nav-barLogo">
        <img className="Logo" src={logo} alt="" />
      </div>
      <div className="clusters">
        <select name="cluster" onClick={handleSelect}>
          {clusterOptions.map((element, index) => (
            <option key={index} value={element.value}>
              {element.value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <a className="navLinks" onClick={toHome}>
          Home
        </a>
        <a className="navLinks" onClick={signOut}>
          Sign Out
        </a>
      </div>
    </div>
  );
};
export default NavBar;
