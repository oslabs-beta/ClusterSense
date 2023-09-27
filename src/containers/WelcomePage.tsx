import ReactElement from 'react';
import React, { useState, useEffect } from 'react';
import logo2 from '../assets/logo2.png';
import MeetTeam from '../components/MeetTeam';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { AppBar, Toolbar, Container, Typography, Button, Box, Grid } from '@mui/material';
// import { styled } from '@mui/system';
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
    const loremParagraph1 = `An intuitive and feature-rich GUI that simplifies Kafka cluster management, monitoring, and interaction to streamline operations and efficiency when working with Kafka clusters.`;
    const loremParagraph2 = `ClusterSense provides pre-built charts for the most important metrics in your Kafka Application.
    User port numbers are saved and available with our drop own menu.`
    // const loremParagraph3 = "Port information of existing users are stored in our database for immediate access to their metrics. Metrics are not stored in our database.";

    // const CustomAppBar = styled(AppBar)({
    //     backgroundColor: 'transparent',
    //     boxShadow: 'none',
    //   });
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
                        {/* <Button href="#signup-login" color="inherit">Log in/Sign up</Button> */}
                        <Button href="#get-started" color="inherit">Get Started</Button>
                        <Button href="#demo" color="inherit">Demo</Button>
                        <Button href="#team" color="inherit">Team</Button>
                    </Box>
                </Toolbar>
            </CustomAppBar>
            <div className="bg-gradient-to-r from-[#3D2F91] to-[#89278D] background-animate flex items-center">
                <div className = "flex flex-wrap justify-center w-1/2 my-28">
                    <div className="flex text-white items-center justify-center text-center text-8xl pl-20">
                        {/* <div className = "flex justify-center"> */}
                            <img
                                // className="mx-auto"
                                style={{ width: '8%', margin: '10px'}}
                                src={logo2}
                                alt=""
                            />
                            <h1>ClusterSense</h1>
                        {/* </div> */}
                    {/* </div> */}
                        {/* <div className = "flex justify-center"> */}
                        {/* </div> */}
                    </div>
                    <div className="flex text-white items-center justify-center text-center text-1xl pl-20">
                        {/* <div className = "flex justify-center"> */}
                            {/* <h2>Kafka Cluster Management Tool</h2> */}
                            <TypeAnimation
                                preRenderFirstString={true}
                                sequence={[
                                500,
                                '  Kafka Cluster Management Tool', // initially rendered starting point
                                1000,
                                'View your metrics',
                                // 1000,
                                // 'We produce food for Guinea Pigs',
                                // 1000,
                                // 'We produce food for Chinchillas',
                                // 500,
                                ]}
                                speed={50}
                                style={{ fontSize: '2em' }}
                                repeat={Infinity}
                            />
                        {/* </div> */}
                    {/* </div> */}
                        {/* <div className = "flex justify-center"> */}
                        {/* </div> */}
                    </div>
                </div>
                {/* Section for SignUp and SignIn */}
                {/* {marginBottom: '4rem',
          background: 'transparent'} */}
                <div className = "flex grow justify-center items-center w-1/2 my-28">
                    <Container id="signup-login" style={containerStyle}>
                        {showSignUp ? <SignUp showSignIn={handleShowSignIn} /> : <SignIn showSignUp={handleShowSignUp} />}
                    </Container>
                </div>
            </div>

            {/* Introduction or "Get Started" section */}
            {/* <Container id="get-started" maxWidth="sm">
                <Box my={4} textAlign="center">
                    <Typography variant="body1">
                        <h2 className = "text-xl font-bold pb-4"
                        // style={{ font-size: '20px' }}
                        >Welcome!</h2>{loremParagraph1}
                    </Typography>
                </Box>
            </Container> */}

            {/* Section checkout our github */}
            {/* <RepoSection /> */}

            {/* Section local installation */}
            {/* <LocalInstall /> */}

            {/* Section showcasing the product demo */}
            <h2 className = "text-xl font-bold pb-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center", marginTop: '20px'}}
                        // style={{ font-size: '20px' }}
                >Welcome to ClusterSense!</h2>
                <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center", marginBottom: '30px', marginLeft: '500px', marginRight: '500px'}}>
                        {loremParagraph1}
                </Typography>
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
                                flexDirection: 'column', // Change the flex direction to column
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
                                flexDirection: 'column', // Change the flex direction to column
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
                                flexDirection: 'column', // Change the flex direction to column
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
                    {/* <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                            sx={{
                                width: 300,
                                height: 300,
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                backgroundColor: 'primary.main',
                                opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        />
                    </Grid> */}
                    {/* </Grid>
                    <RepoSection />
                <Grid container spacing={3}> */}
                    {/* <Typography variant="body1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: "center"}}>
                        <h2 className = "text-xl font-bold pb-4"
                        // style={{ font-size: '20px' }}
                        >Welcome!</h2><br></br>{loremParagraph1}
                    </Typography> */}

                    {/* Description followed by demo */}
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {/* <Typography variant="body1">
                        <h2 className = "text-xl font-bold pb-4"
                        // style={{ font-size: '20px' }}
                        >Welcome!</h2>{loremParagraph1}
                    </Typography> */}
                        <Typography variant="body1">
                        <h2 className = 'ext-xl font-bold pb-4'>Getting Started</h2>{loremParagraph2}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src="/src/assets/Charts.gif" alt="Demo GIF" />
                    </Grid>
                </Grid>
            </Container>
            <br></br>
            <RepoSection />

            {/* "Meet the Team" section */}
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
