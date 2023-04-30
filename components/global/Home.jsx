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
import { Button, IconButton, Typography } from "@mui/material";
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
    const logOut = () => {
        auth.signOut();
        localStorage.setItem('logged', 'false');
    }
    
   
    return(
        <div className="w-full h-screen flex flex-col">
            <ThemeProvider theme={theme}>
                <AppBar  position="static">
                    <Toolbar>
                    <IconButton
                            size="large"
                            edge="start"
                            color="secondary"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color='secondary'>
                            News
                        </Typography>
                        <Button color="secondary" onClick={()=> logOut()}>Log out</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            {/* <div className="flex-none flex flex-col items-center justify-center h-[80px] bg-red-main rounded-b rounded-b-[20px] shadow-xl">
                <h1 className="text-3xl font-bold text-gray-main">{mode.charAt(0).toUpperCase() + mode.slice(1)}</h1>
            </div> */}
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