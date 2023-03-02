import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { endpoints } from "../../../config/endpoints";
import { setSession, setUser } from "../../../redux/features/actions/session";
import { useAppDispatch } from "../../../redux/hooks";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



const Login = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [invalidUser, setInvalidUser] = useState(false)
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    // useEffect(() => {
    //     if(localStorage.getItem('logged') === 'true') {
    //         router.push('/users')
    //     }
    // }, [router])

    const execLogIn = async (logData) => {
        event.preventDefault();
        const data = {...logData};
        console.log(data)
        // try {
        //     const rsp = await axios.post(endpoints('user_login'), data);
        //     if (rsp.status === 401){
        //         console.log('failed: ', rsp.data)
        //     } else if (rsp.status === 200) {
        //         setInvalidUser(false)
        //         console.log('response backend: ', rsp.data)
        //         localStorage.setItem('logged', 'true')
        //         localStorage.setItem('user', JSON.stringify(rsp.data));
        //         dispatch(setSession(true));
        //         dispatch(setUser(rsp.data));
        //         router.push('/');
        //     }
        // } catch(err){
        //     console.log(err)
        //     if(err.response.status === 401) {
        //         console.log(err.response.data.message)
        //         setInvalidUser(true);

        //     }
        // }




        // try {
        //     const data = {...logData};
        //     const req = await axios.post(endpoints('user_login'), data);
        //     if(req.data.token) {
        //         localStorage.setItem('logged', 'true')
        //         localStorage.setItem('user', JSON.stringify(req.data));
        //         dispatch(setSession(true));
        //         dispatch(setUser(req.data));
        //         router.push('/');
        //     }
        // } catch (err) {
        //     console.error(err)
        //     if(err.response.data.error.statusCode == 401) {
        //         setInvalidUser(true);
        //     }
        // }
    }

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Gastos App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
      

    return (
        <Container 
            component="main" 
            maxWidth="xs" 
            sx={{
                height: '100vh',
                display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
            justifyContent:'center'
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ 
                    margin: 1,
                    bgcolor: 'secondary.main'
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={() => execLogIn(userData)} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setUserData({ ...userData, username: e.target.value})}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value})}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        // <div className="flex flex-col min-h-screen h-full w-full px-4 items-center justify-center pb-10">
        //         <span className="lg:text-5xl text-4xl text-left place-self-start lg:place-self-center">Welcome to <strong>Cloud <br/>Biomanufacturing</strong></span>
        //         <form className="flex flex-col mt-20 w-full items-center" onSubmit={() => execLogIn(userData)}>
        //             <input
        //                 onChange={(e) => setUserData({ ...userData, username: e.target.value})}
        //                 type="text"
        //                 className="border border-black border-opacity-50 bg-gray-200 px-3.5 h-11.5 text-xs w-full lg:w-[335px]"
        //                 name="username"
        //                 id="username"
        //                 placeholder="Username"
        //             />
        //             <input
        //                 onChange={(e) => setUserData({ ...userData, password: e.target.value})}
        //                 type="password"
        //                 className="border border-black border-opacity-50 bg-gray-200 px-3.5 h-11.5 mt-5 text-xs w-full lg:w-[335px]"
        //                 name="password"
        //                 id="password"
        //                 placeholder="Password"
        //             />
        //             <button type="submit" className={"place-self-center w-full mt-5 rounded-[60px] hover:opacity-80 p-1.5 h-11.5 lg:w-[335px]"}>Log in</button> 
        //         </form>
        //     {
        //         invalidUser &&
        //         <span className="text-red-500 text-sm mt-5">Username or password are incorrect</span>
        //     }


        // </div>
    );
}

export default Login;