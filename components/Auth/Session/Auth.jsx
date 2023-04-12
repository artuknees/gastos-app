import { useRouter } from "next/router";
import { useEffect } from "react";
import { initFirebase } from "../../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";

const Auth = ({ children }) => { // this is the global component inside Provider. Checks always if the user is logged.
    initFirebase();
    const router = useRouter()
    const auth = getAuth(); // instance of auth method
    const [user, loading] = useAuthState(auth);
    useEffect(() => { // log in checking
        if (user){
            console.log('logueado')
            router.push('/')
        } else {
            console.log('no logueado')
            router.push('/auth/login')
        }
    },[user , router.pathname])

    return (
        <>{children}</>
    )
}

export default Auth;