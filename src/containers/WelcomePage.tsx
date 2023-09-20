import React, { useState } from 'react';
import logo from '../assets/ClusterSenseNode.png';
import MeetTeam from '../components/MeetTeam';
import WelcomeNavBar from '../components/WelcomeNavBar';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { Container, Typography, Box, Grid } from '@mui/material';

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
    const loremParagraph = "Placeholder text for the content. While the origins of this famous phrase are not entirely certain, the statement remains largely relevant today. With advances in technology and the interconnectedness of societies worldwide, communication remains a crucial tool in fostering peace and understanding. As we continue to innovate, it's essential to remember the value of human connection. Communication is not just about speaking; it's about listening and understanding. As the world becomes more digital, we must not forget the importance of personal touch. Whether we're talking about international relations or interpersonal relationships, understanding is the key to success.";

    return (
        <div>
            {/* Navigation bar */}
            <WelcomeNavBar />
    
            {/* Section for SignUp and SignIn */}
            <Container id="signup-login" style={{ marginBottom: '4rem', backgroundColor: 'white' }}>
                {showSignUp ? <SignUp showSignIn={handleShowSignIn} /> : <SignIn showSignUp={handleShowSignUp} />}
            </Container>

            {/* Introduction or "Get Started" section */}
            <Container id="get-started" maxWidth="sm">
                <Box my={4} textAlign="center">
                    <Typography variant="body1">
                        <h2>Get Started:</h2>{loremParagraph}
                    </Typography>
                </Box>
            </Container>

            {/* Section showcasing the product demo */}
            <Container id="demo">
                <Grid container spacing={4}>
                    {/* Description followed by demo */}
                    <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="body1">
                        <h2>Demo 1</h2>{loremParagraph}
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
                        <h2>Demo 2</h2>{loremParagraph}
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
