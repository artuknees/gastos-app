import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { endpoints } from "../../../config/endpoints";
import { setSession, setUser } from "../../../redux/features/actions/session";
import { useAppDispatch } from "../../../redux/hooks";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Swal from "sweetalert2";
import { swalWrong } from "../../../config/swalConfig";
import { initFirebase } from "../../../firebase";
import { GoogleAuthProvider , getAuth , signInWithPopup  } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from "@mui/material";

const Login = () => {
    initFirebase();
    const router = useRouter()
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
    const provider = new GoogleAuthProvider();
    const auth = getAuth(); // instance of auth method
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
            <CircularProgress/>
        </div>
        )
    };

    const signIn = async () => { // basic sign in function
        try {
            const result = await signInWithPopup(auth,provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)    
            // console.log({
            //     credential: credential,
            //     token: token,
            //     user: user
            // });
            // comento esto porque esta en auth
            // router.push('/')
        } catch(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // console.log({
            //     errorCode: errorCode,
            //     errorMessage: errorMessage,
            //     email: email,
            //     credential: credential
            // })
        }
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
                <button className="w-full border w-[400px] h-[48px] bg-red-200 font-semibold" onClick={() => signIn()}>Log in firebase</button>
                {/* <Box component="form" onSubmit={() => execLogIn(userData)} noValidate sx={{ mt: 1 }}>
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
                </Box> */}
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

export default Login;