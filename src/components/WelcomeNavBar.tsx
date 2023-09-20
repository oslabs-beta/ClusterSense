import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from '../assets/ClusterSenseNode.png'; // Logo import for the navigation bar

/**
 * WelcomeNavBar - A sticky navigation bar for the welcome page.
 * 
 * Contains:
 * 1. Company logo on the left
 * 2. Navigation buttons on the right
 */
const WelcomeNavBar = () => {
    return (
        <AppBar position="sticky">
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
        </AppBar>
    );
}

export default WelcomeNavBar;
