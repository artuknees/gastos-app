import React,{useEffect,useState} from "react";
import {  getAuth   } from "firebase/auth";
import { initFirebase } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import NavBar from "./NavBar";
import Profile from "../profile/Profile";
import Summary from "../summary/Summary";
import Add from "../add/Add";
import { ThemeProvider , createTheme } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


const Home = () => {
    initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [mode , setMode] = useState('summary');
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF8173',
            },
            secondary: {
                main: '#F3F3F2'
            }
        },
    });
    const logOut = () => { // logout function
        auth.signOut();
        localStorage.setItem('logged', 'false');
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl); // status for open
    const handleMenu = (event) => { // click for togglin menu
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { // close dropdown menu
      setAnchorEl(null);
    };
    const handleRouteMenu = (e) => { // different options for menu
        if(e === 'logout') {
            logOut();
        } else {
            setMode(e);
        }
        handleClose();
    };
   
    return(
        <div className="w-full h-screen flex flex-col">
            <ThemeProvider theme={theme}>
                <AppBar  position="static">
                    <Toolbar>
                    <IconButton onClick={handleMenu}
                            size="large"
                            edge="start"
                            color="secondary"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => handleRouteMenu('summary')}>Summary</MenuItem>
                            <MenuItem onClick={() => handleRouteMenu('add')}>Add expense</MenuItem>
                            <MenuItem onClick={() => handleRouteMenu('report')}>Report</MenuItem>
                            <MenuItem onClick={() => handleRouteMenu('profile')}>Profile</MenuItem>
                            <MenuItem onClick={() => handleRouteMenu('logout')}>Logout</MenuItem>
                        </Menu>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color='secondary'>
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </Typography>
                        <Button color="secondary" onClick={()=> logOut()}>Log out</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <div className="flex-auto h-full flex flex-col overflow-y-auto scrollbar shadow-lg">
                <div className="px-5 h-full w-full">
                    {mode === 'summary' && <Summary/>}
                    {mode === 'add' && <Add/>}
                    {mode === 'profile' && <Profile/> }
                </div>
            </div>
            <NavBar mode={mode} setMode={setMode}/>
        </div>
    )
};

export default Home;