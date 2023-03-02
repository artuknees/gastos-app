import { useRouter } from "next/router";
import { useEffect } from "react";
import { setUser, setSession } from "../../../redux/features/actions/session";
import { useAppDispatch } from "../../../redux/hooks";

const Auth = ({ children }) => { // this is the global component inside Provider. Checks always if the user is logged.
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => { // sends to login if the user is not logged
        if(!localStorage.getItem('logged') || localStorage.getItem('logged') === 'false') {
            router.push('/auth/login')
        } else {
            // if its logged, info gets dispatched
            const logged = localStorage.getItem('logged') || null;
            const user = localStorage.getItem('user') || null
            dispatch(setSession(JSON.parse(logged)))
            dispatch(setUser(JSON.parse(user)))
        }
        // eslint-disable-next-line
    }, [router.pathname])

    // useEffect(() => {
    //     const logged = localStorage.getItem('logged') || null;
    //     const user = localStorage.getItem('user') || null
    //     dispatch(setSession(JSON.parse(logged)))
    //     dispatch(setUser(JSON.parse(user)))
    //     // eslint-disable-next-line
    // }, [dispatch])

    return (
        <>{children}</>
    )
}

export default Auth;