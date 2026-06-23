import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import logo2 from '../assets/logo2.png';
import useMenu from '../hooks/useMenu';

type Cluster = { value: string; label: string };

interface NavProps {
  setPort: (port: string) => void;
  formStatus: boolean;
  formSubmission: (status: boolean) => void;
  clusterOptions: Cluster[];
  setClustersOptions: (clusters: Cluster[]) => void;
}

const NavBar = ({
  setPort,
  formStatus,
  formSubmission,
  clusterOptions,
  setClustersOptions,
}: NavProps) => {
  const accountMenu = useMenu();
  const clusterMenu = useMenu();

  const navigate = useNavigate();

  const toHome = () => {
    formSubmission(false);
    navigate('/home');
  };

  const signOut = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Error deleting session');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelect = (value: string) => {
    if (value) {
      setPort(value);
      formSubmission(true);
      clusterMenu.handleClose();
    }
  };

  interface ClusterType {
    cluster_port: number;
  }

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await fetch('/cluster/DB', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (!data.length) {
            setClustersOptions([{ value: '', label: 'Empty' }]);
          } else {
            const convertData = data.map((cluster: ClusterType) => ({
              value: cluster.cluster_port.toString(),
              label: cluster.cluster_port.toString(),
            }));
            setClustersOptions(convertData);
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

  return (
    <div className="nav-bar">
      <AppBar
        position="static"
        className="bg-nav-gradient"
      >
        <Toolbar className="justify-between">
          <div className="flex items-center">
            <Menu
              anchorEl={accountMenu.anchorEl}
              open={Boolean(accountMenu.anchorEl)}
              onClose={accountMenu.handleClose}
            >
              <MenuItem onClick={signOut}>Sign Out</MenuItem>
            </Menu>
            <Box
              component="img"
              sx={{ height: 54 }}
              alt="Logo2"
              src={logo2}
              onClick={toHome}
            />
            <Typography
              variant="h5"
              component="div"
              onClick={toHome}
              className="m-2.5"
            >
              ClusterSense
            </Typography>
          </div>
          <Stack direction="row" spacing={2}>
            <Menu
              anchorEl={clusterMenu.anchorEl}
              open={Boolean(clusterMenu.anchorEl)}
              onClose={clusterMenu.handleClose}
            >
              {clusterOptions.map((element: Cluster, index: number) => (
                <MenuItem
                  key={element.value || index}
                  onClick={() => handleSelect(element.value)}
                >
                  {element.label}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={clusterMenu.handleOpen}
              color="inherit"
            >
              <BubbleChartIcon sx={{ color: 'white' }} />
            </IconButton>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={accountMenu.handleOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;