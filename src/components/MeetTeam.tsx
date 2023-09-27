import React from 'react';
// import teamPhoto from '../assets/team.png';
import DanielLee from '../assets/DanielLee.jpeg';
import WanluDing from '../assets/WanluDing.jpeg';
import SamJohnson from '../assets/SamJohnson.png';
import AllenHui from '../assets/AllenHui.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

// Array of team member details
const teamMembers = [
  // Individual members' information
  {
    name: "Allen Hui",
    photo: AllenHui,
    email: "huiallen92@gmail.com",
    linkedin: "https://www.linkedin.com/in/allen-hui-7b590b9a/",
    github: "https://github.com/Ahuim8",
  },
  {
    name: "Daniel Lee",
    photo: DanielLee,
    email: "jungtaelee0128@gmail.com",
    linkedin: "https://www.linkedin.com/in/jungtaelee/",
    github: "https://github.com/jungtaelee0128",
  },
  {
    name: "Sam Johnson",
    photo: SamJohnson,
    email: "SFJohnson24@gmail.com",
    linkedin: "https://www.linkedin.com/in/samuel-johnson-dpt/",
    github: "https://github.com/SFJohnson24",
  },
  {
    name: "Wanlu Ding",
    photo: WanluDing,
    email: "wanlu.ding@gmail.com",
    linkedin: "https://www.linkedin.com/in/wanlu-ding/",
    github: "https://github.com/WanluD",
  },
];

/**
 * MeetTeam Component
 * This component displays the 'Meet the Team' section, including
 * a list of team members and associated links to their GitHub and LinkedIn profiles.
 */
const MeetTeam: React.FC = () => {
  return (
    <div className="meetTeamContainer" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
      marginTop: '20px'
    }}>
      <h2 style={{ fontSize: '25px', marginBottom: '20px', fontFamily: 'Arial, sans-serif', marginTop: '15px' }}>
        Meet the Team
      </h2>

      {/* Project repositories links */}
      {/* <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <p>Check out our:</p>
        <a href="https://github.com/SFJohnson24/Mock_Kafka" target="_blank" rel="noopener noreferrer" style={{ marginRight: '15px' }}>
          <FontAwesomeIcon icon={faGithub} /> Demo App
        </a>
        <a href="https://github.com/oslabs-beta/ClusterSense" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} /> Product GitHub
        </a>
      </div> */}

      {/* List of team members */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
      }}>
        {teamMembers.map((member, index) => (
          <div key={index} style={{
            flex: '1',
            margin: '1rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            maxWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f5f5f5'
          }}>
            {/* Member's photo */}
            <img src={member.photo} alt={member.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }} />

            {/* Member's name */}
            <h3 style={{ fontWeight: 'bold', marginBottom: '5px' }}>{member.name}</h3>

            {/* Member's email */}
            <p style={{ fontSize: '0.8rem', marginBottom: '10px' }}>{member.email}</p>

            {/* Member's LinkedIn and GitHub links */}
            <div>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetTeam;
