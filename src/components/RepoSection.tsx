import React from 'react';
import githubIcon from '../assets/githubIcon.png';

const RepoSection: React.FC = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      backgroundColor: 'white',
    }}>
      <h2 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
        <span>Check our Github </span>
        <a href="https://github.com/oslabs-beta/ClusterSense" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', marginBottom: '2px',justifyContent: 'center', alignItems :'center'}}>
          <img src={githubIcon} alt="GitHub Logo" style={{ width: '30px', height: '30px' }} />
        </a>
      </h2>
    </div>
);

export default RepoSection;
