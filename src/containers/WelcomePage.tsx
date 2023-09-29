import ReactElement from 'react';
import { useState, useEffect } from 'react';
import logo2 from '../assets/logo2.png';
import MeetTeam from '../components/MeetTeam';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { AppBar, Toolbar, Container, Typography, Button, Box, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { TypeAnimation } from 'react-type-animation';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RepoSection from '../components/RepoSection';
import TimelineIcon from '@mui/icons-material/Timeline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CableIcon from '@mui/icons-material/Cable';
import chartsVisual from '../assets/Charts.gif'

const WelcomePage = (): ReactElement => {  

    // State to toggle between SignUp and SignIn components
    const [showSignUp, setShowSignUp] = useState(false);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    // Handlers to toggle visibility of SignUp and SignIn components
    const handleShowSignIn = ():void => {
        setShowSignUp(false);
    };
  
    const handleShowSignUp = ():void => {
        setShowSignUp(true);
    };

    useEffect(() => {
        const handleScroll = ():void => {
            const meetTeamElem = document.getElementById("team");
            const rect = meetTeamElem?.getBoundingClientRect();
            if (rect && rect.top <= window.innerHeight) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sample text for demonstration
    const appIntro = `An intuitive and feature-rich GUI that simplifies Kafka cluster management, monitoring, and interaction to streamline operations and efficiency when working with Kafka clusters.`;
    const ourApp = `ClusterSense provides pre-built charts for the most important metrics in your Kafka Application.
    User port numbers are saved and available with our drop own menu.`
    // const loremParagraph3 = "Port information of existing users are stored in our database for immediate access to their metrics. Metrics are not stored in our database.";

    const CustomAppBar = styled(AppBar)`
    background-color: transparent;
    box-shadow: none;
  ` as unknown as typeof AppBar;
    
      const theme = useTheme();
      const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
      const containerStyle = {
          padding: isSmallScreen ? '0 1rem' : '0 5rem',
          marginBottom: '4rem',
          background: 'transparent'
      };
    return (
        <div>
            {/* Navigation bar */}
            <CustomAppBar position="sticky" className = "bg-gradient-to-r from-[#3D2F91] to-[#89278D] background-animate " sx={{ fontFamily: 'dm-sans' }}>
                <Toolbar>
                    {/* Logo Display */}
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Box
                            component="img"
                            sx={{ height: 54 }}
                            alt="Logo2"
                            src={logo2}
                        />
                    </Typography>
                    
                    {/* Navigation Buttons */}
                    <Box display="flex">
                        <Button href="#get-started" color="inherit">Features</Button>
                        <Button href="#demo" color="inherit">Get Started</Button>
                        <Button href="#team" color="inherit">Team</Button>
                    </Box>
                </Toolbar>
            </CustomAppBar>
            <div className="bg-gradient-to-r from-[#3D2F91] to-[#89278D] background-animate flex items-center">
                <div className = "flex flex-wrap justify-center w-1/2 my-28">
                    <div className="flex text-white items-center justify-center text-center text-8xl pl-20">
                            <img
                                style={{ width: '8%', margin: '10px'}}
                                src={logo2}
                                alt=""
                            />
                            <h1>ClusterSense</h1>
    
                    </div>
                    <div className="flex text-white items-center justify-center text-center text-1xl pl-20">
                            <TypeAnimation
                                preRenderFirstString={true}
                                sequence={[
                                500,
                                '  Kafka Cluster Management Tool', 
                                1000,
                                'View your metrics',
                                ]}
                                speed={50}
                                style={{ fontSize: '2em' }}
                                repeat={Infinity}
                            />
                    </div>
                </div>
                <div className = "flex grow justify-center items-center w-1/2 my-28">
                    <Container id="signup-login" style={containerStyle}>
                        {showSignUp ? <SignUp showSignIn={handleShowSignIn} /> : <SignIn showSignUp={handleShowSignUp} />}
                    </Container>
                </div>
            </div>
            <div id = "get-started" style={{ marginTop : '100px', marginBottom : '100px'}}>
                <h2 className = "text-3xl font-bold pb-4" style={{ display: 'flex', justifyContent: 'center', textAlign: "center"}}
                >Welcome to ClusterSense!</h2>
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center", marginBottom: '30px', marginLeft: '500px', marginRight: '500px'}}>
                        {appIntro}
                </Typography>
            </div>
            <Container id="demo">
                <Typography variant="h4" sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center',}}>
                        Core Features
                </Typography>
                <br></br>
                <Grid container spacing={3}>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                width: 300,
                                height: 300,
                                backgroundColor: '#3D2F91',
                                display: 'flex',
                                flexDirection: 'column', 
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                                '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >
                            <TimelineIcon fontSize="large" style={{ color: 'white', fontSize: 150 }}/>
                            <br /> 
                            <Typography variant="h6" color="white">
                                Realtime charts
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box
                            sx={{
                                width: 300,
                                height: 300,
                                backgroundColor: '#3D2F91',
                                display: 'flex',
                                flexDirection: 'column', 
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                                '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >
                            <VerifiedUserIcon fontSize="large" style={{ color: 'white', fontSize: 150 }}/>
                            <br /> 
                            <Typography variant="h6" color="white">
                                User Authentication
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                            sx={{
                                width: 300,
                                height: 300,
                                backgroundColor: '#3D2F91',
                                display: 'flex',
                                flexDirection: 'column', 
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 8,
                                '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        >
                            <CableIcon fontSize="large" style={{ color: 'white', fontSize: 150 }}/>
                            <br /> 
                            <Typography variant="h6" color="white">
                                Revisit previous ports
                            </Typography>
                        </Box>
                    </Grid>    
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop : '100px'}}>
                        <Typography variant="body1">
                        <h2 className = 'text-xl font-bold pb-4'>Getting Started</h2>{ourApp}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop : '100px' }}>
                        <img src={chartsVisual} alt="Demo GIF" />
                    </Grid>
                </Grid>
            </Container>
            <br></br>
            <RepoSection />
            <Container id="team">
                <MeetTeam />
            </Container>
            {showScrollTopButton && (
                <IconButton 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 1000
                 }} 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                <ArrowUpwardIcon fontSize="large" />
            </IconButton>
        )}
        </div>
    );
}

export default WelcomePage;
