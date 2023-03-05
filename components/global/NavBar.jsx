import React , {useState} from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CssBaseline from '@mui/material/CssBaseline';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { useAppSelector } from '../../redux/hooks';

const NavBar = () => {
    const [toggleUser, setToggleUser] = useState(false);
    const router = useRouter();
    const { logged } = useAppSelector(state => state.session);

  return (
    <>
        {logged === true &&
            <>
                <Box sx={{ flexGrow: 1 }}>
                <CssBaseline/>
                <AppBar position="static" >
                    <Toolbar style={{margin: 0 , paddingRight: 12 , paddingLeft: 12  }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 , textAlign: 'center'}}>
                        Gastos App
                    </Typography>
                    <IconButton color="inherit" onClick={() => setToggleUser(!toggleUser)}>
                        <AccountCircleIcon/>
                    </IconButton>
                    </Toolbar>
                </AppBar>
                </Box>

                {toggleUser && 
                
                    <Box position='absolute' sx={{
                        zIndex: 10,
                        width: '100%',
                        position:'end',
                        textAlign:'end',
                        }}>
                        <Button onClick={() => router.push('/reset')}>
                            <LogoutIcon/>
                            <Typography>Log Out</Typography>
                        </Button>
                    </Box>
                }
            </>
        }

    </>
  );
}

export default NavBar;