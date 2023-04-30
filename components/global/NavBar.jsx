import React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const NavBar = ({ mode , setMode}) => {
  const handleChange = (event, newValue) => {
    setMode(newValue);
  };
  return (
    <Paper elevation={16} sx={{width:"100%" , height:"92px" }}>
      <BottomNavigation 
        sx={{ 
          width: "100%",
          height:"100%",
          backgroundColor:'#F3F3F2'
        }} 
        value={mode} 
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Summary"
          value="summary"
          icon={<SummarizeIcon fontSize='large' />}
        />
        <BottomNavigationAction
          label="Add"
          value="add"
          icon={<AddCircleOutlineIcon fontSize='large' />}
        />
        <BottomNavigationAction
          label="Report"
          value="report"
          icon={<LeaderboardIcon fontSize='large' />}
        />
        <BottomNavigationAction 
          label="Profile" 
          value="profile" 
          icon={<AccountBoxIcon fontSize='large' />} 
        />
      </BottomNavigation>
    </Paper>
  );
}

export default NavBar;