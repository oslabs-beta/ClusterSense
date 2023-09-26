import React, { useState } from 'react';
import logo from '../assets/ClusterSenseNode.png';
import logo2 from '../assets/logo2.png';
import MeetTeam from '../components/MeetTeam';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { AppBar, Toolbar, Container, Typography, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import logoFour from '../assets/ClusterSenseBigger.png';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const WelcomePage = () => {  

    // State to toggle between SignUp and SignIn components
    const [showSignUp, setShowSignUp] = useState(false);

    // Handlers to toggle visibility of SignUp and SignIn components
    const handleShowSignIn = () => {
        setShowSignUp(false);
    };
  
    const handleShowSignUp = () => {
        setShowSignUp(true);
    };

    // Sample text for demonstration
    const loremParagraph1 = `An intuitive and feature-rich GUI that simplifies Kafka cluster management, monitoring, and interaction to streamline operations and efficiency when working with Kafka clusters.`;
    const loremParagraph2 = `ClusterSense provides pre-built charts for the most important metrics in your Kafka Application.`
    const loremParagraph3 = "Port information of existing users are stored in our database for immediate access to their metrics. Metrics are not stored in our database.";

    const CustomAppBar = styled(AppBar)({
        backgroundColor: 'transparent',
        boxShadow: 'none',
      });
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
            <CustomAppBar position="sticky" className = "gradient-background" sx={{ fontFamily: 'dm-sans' }}>
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
                        <Button href="#signup-login" color="inherit">Log in/Sign up</Button>
                        <Button href="#get-started" color="inherit">Get Started</Button>
                        <Button href="#demo" color="inherit">Demo</Button>
                        <Button href="#team" color="inherit">Team</Button>
                    </Box>
                </Toolbar>
            </CustomAppBar>
            <div className="gradient-background flex items-center">
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
                    <div className="flex text-white items-center justify-center text-center text-3xl pl-20">
                        {/* <div className = "flex justify-center"> */}
                            <h2>Kafka Cluster Management Tool</h2>
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
            <Container id="get-started" maxWidth="sm">
                <Box my={4} textAlign="center">
                    <Typography variant="body1">
                        <h2 className = "text-xl font-bold pb-4"
                        // style={{ font-size: '20px' }}
                        >Welcome!</h2>{loremParagraph1}
                    </Typography>
                </Box>
            </Container>

            {/* Section showcasing the product demo */}
            <Container id="demo">
                <Grid container spacing={4}>
                    {/* Description followed by demo */}
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body1">
                        <h2 className = 'ext-xl font-bold pb-4'>Getting Started</h2>{loremParagraph2}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img src="/src/assets/ClusterSense.png" alt="Demo GIF" />
                    </Grid>

                    {/* Demo followed by description */}
                    <Grid item xs={6}>
                        <img src="/src/assets/ClusterSense.png" alt="Demo GIF" />
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body1">
                        <h2 className = 'ext-xl font-bold pb-4'>Existing Users</h2>{loremParagraph3}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* "Meet the Team" section */}
            <Container id="team">
                <MeetTeam />
            </Container>
        </div>
    );
}

export default WelcomePage;
