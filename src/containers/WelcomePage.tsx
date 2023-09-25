import React, { useState } from 'react';
import logo from '../assets/ClusterSenseNode.png';
import MeetTeam from '../components/MeetTeam';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { AppBar, Toolbar, Container, Typography, Button, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

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
    const loremParagraph1 = `Get Started: 
    Placeholder text for the content.
    While the origins of this famous phrase are not entirely certain, the statement remains largely relevant today. With advances in technology and the interconnectedness of societies worldwide, communication remains a crucial tool in fostering peace and understanding. As we continue to innovate, it's essential to remember the value of human connection. Communication is not just about speaking; it's about listening and understanding. As the world becomes more digital, we must not forget the importance of personal touch. Whether we're talking about international relations or interpersonal relationships, understanding is the key to success.`;
    const loremParagraph2 = "Demo1: Placeholder text for the content. While the origins of this famous phrase are not entirely certain, the statement remains largely relevant today. With advances in technology and the interconnectedness of societies worldwide, communication remains a crucial tool in fostering peace and understanding. As we continue to innovate, it's essential to remember the value of human connection. Communication is not just about speaking; it's about listening and understanding. As the world becomes more digital, we must not forget the importance of personal touch. Whether we're talking about international relations or interpersonal relationships, understanding is the key to success.";
    const loremParagraph3 = "Demo2: Placeholder text for the content. While the origins of this famous phrase are not entirely certain, the statement remains largely relevant today. With advances in technology and the interconnectedness of societies worldwide, communication remains a crucial tool in fostering peace and understanding. As we continue to innovate, it's essential to remember the value of human connection. Communication is not just about speaking; it's about listening and understanding. As the world becomes more digital, we must not forget the importance of personal touch. Whether we're talking about international relations or interpersonal relationships, understanding is the key to success.";

    const CustomAppBar = styled(AppBar)({
        // backgroundColor: '#3D2F91',  // Use your desired hex color here
          // backgroundImage: 'linear-gradient(to left, #3D2F91, #89278D)',
        // backgroundImage: 'linear-gradient(to bottom, #89278D, white)',
        backgroundColor: 'transparent',
        boxShadow: 'none',
      });

    return (
        <div>
            {/* Navigation bar */}
            <CustomAppBar position="sticky" className = "gradient-background">
            <Toolbar>
                {/* Logo Display */}
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    <Box
                        component="img"
                        sx={{ height: 54 }}
                        alt="Logo"
                        src={logo}
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
        <div className = "gradient-background flex " >
            {/* Section for SignUp and SignIn */}
            <Container id="signup-login" style={{ marginBottom: '4rem', background: 'transparent' }}>
                {showSignUp ? <SignUp showSignIn={handleShowSignIn} /> : <SignIn showSignUp={handleShowSignUp} />}
            </Container>
        </div>

            {/* Introduction or "Get Started" section */}
            <Container id="get-started" maxWidth="sm">
                <Box my={4} textAlign="center">
                    <Typography variant="body1">
                        <h2>Get Started:</h2>{loremParagraph1}
                    </Typography>
                </Box>
            </Container>

            {/* Section showcasing the product demo */}
            <Container id="demo">
                <Grid container spacing={4}>
                    {/* Description followed by demo */}
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body1">
                        <h2>Demo 1</h2>{loremParagraph2}
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
                        <h2>Demo 2</h2>{loremParagraph3}
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
