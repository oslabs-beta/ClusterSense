import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/ClusterSenseNode.png';
import MouseEvent from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { styled } from '@mui/system';

interface NavProps {
  setPort: (e: number) => void;
  formStatus: (e: boolean) => void;
  formSubmission: (e: boolean) => void;
}

const NavBar = ({
  setPort,
  formStatus,
  formSubmission,
  clusterOptions,
  setClustersOptions,
}: NavProps) => {
  // const [clusterOptions, setClustersOptions] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [clusterMenuAnchorEl, setClusterMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const toHome = () => {
    formSubmission(false);
    const path: string = '/home';
    navigate(path);
  };

  const signOut = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        const path: string = '/';
        navigate(path);
      } else {
        console.error('Error deleting session');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  function handleSelect(e: MouseEvent) {
    const chosenCluster = e.target.value;
    console.log('chosen', chosenCluster);
    if (chosenCluster !== undefined) {
      setPort(chosenCluster);
      formSubmission(true);
    }
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
          if (!data.length) {
            setClustersOptions([{ value: '', label: 'Empty' }]);
          } else {
            const convertData = data.map((cluster) => {
              const value = cluster.cluster_port.toString();
              const label = cluster.cluster_port.toString();
              return { value: value, label: label };
            });
            await setClustersOptions(convertData);
          }
        } else {
          console.error('Error fetching clusters');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchClusters();
  }, [formStatus]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleClusterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setClusterMenuAnchorEl(event.currentTarget);
  };

  const handleClusterMenuClose = () => {
    setClusterMenuAnchorEl(null);
  };

  const CustomAppBar = styled(AppBar)({
    //backgroundColor: '#4CAF50',  // Use your desired hex color here
    // backgroundColor: 'transparent',
    // backgroundImage: 'linear-gradient(to left, #3D2F91, #89278D)',
    backgroundImage: 'linear-gradient(to bottom, #3D2F91, white)',
    boxShadow: 'none',
  });

  return (
    <div className="nav-bar">
      <CustomAppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          {/* <div className="nav-barLeft"> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              {/* <MenuItem onClick={toHome}>Home</MenuItem> */}
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </Menu>
            <Box
              component="img"
              sx={{ height: 54 }}
              alt="Logo"
              src={logo}
              onClick={toHome}
            />

            <Typography variant="h6" component="div" onClick={toHome}>
              ClusterSense
            </Typography>
            {/* <img className="Logo" src={logo} alt="" /> */}
          </div>
          {/* </div> */}
          <Stack direction="row" spacing={2}>
            {/* <div className="nav-barRight"> */}
            <Menu
              anchorEl={clusterMenuAnchorEl}
              open={Boolean(clusterMenuAnchorEl)}
              onClose={handleClusterMenuClose}
              onClick={handleSelect}
            >
              {clusterOptions.map((element, index) => (
                <MenuItem key={index} value={element.value}>
                  {element.label}
                </MenuItem>
              ))}
            </Menu>

            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClusterMenuOpen}
              color="inherit"
            >
              <BubbleChartIcon sx={{ color: 'white' }} />
            </IconButton>

            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {/* </div> */}
          </Stack>
        </Toolbar>
        </CustomAppBar>
    </div>
  );
};

export default NavBar;

// <div className="nav-bar">
//   <div className="nav-barLogo">
//     <img className="Logo" src={logo} alt="" />
//   </div>
//   <div className="clusters">
//     <select name="cluster" onChange={handleSelect}>
//     <option value="" disabled selected hidden>Choose a Cluster</option>
//       {clusterOptions.map((element, index) => (
//         <option key={index} value={element.value}>
//           {element.value}
//         </option>
//       ))}
//     </select>
//   </div>
//   <div>
//     <a className="navLinks" onClick={toHome}>
//       Home
//     </a>
//     <a className="navLinks" onClick={signOut}>
//       Sign Out
//     </a>
//   </div>
// </div>
