import { useRouter } from "next/router";
import { useEffect } from "react";
import { setUser, setSession } from "../../../redux/features/actions/session";
import { useAppDispatch } from "../../../redux/hooks";

const Auth = ({ children }) => { // this is the global component inside Provider. Checks always if the user is logged.
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => { // sends to login if the user is not logged
        if((!localStorage.getItem('logged') || localStorage.getItem('logged') === 'false') && 
            (!sessionStorage.getItem('logged') || sessionStorage.getItem('logged') === 'false')) {
                router.push('/auth/login')
        } 
        else {
            // if its logged, info gets dispatched
            let logged = false;
            let user = {};
            if (localStorage.getItem('logged')) {
                logged = localStorage.getItem('logged');
                // user = localStorage.getItem('user');    
            } else {
                logged = sessionStorage.getItem('logged');
                // user = sessionStorage.getItem('user');    
            }
            dispatch(setSession(JSON.parse(logged)));
            // dispatch(setUser(JSON.parse(user)));
            router.push('/');
        }
        // eslint-disable-next-line
    }, [router.pathname])


    return (
        <>{children}</>
    )
}

export default Auth;