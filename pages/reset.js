import { useRouter } from "next/router"
import { useEffect } from "react"
import { setSession, setUser } from "../redux/features/actions/session"
import { useAppDispatch } from "../redux/hooks"

const Reset = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    useEffect(() => {
        if(localStorage.getItem('logged')) {
            localStorage.setItem('logged', 'false')
            localStorage.setItem('user', JSON.stringify({}))    
        } else {
            sessionStorage.setItem('logged', 'false')
            sessionStorage.setItem('user', JSON.stringify({}))    
        }
        dispatch(setSession(false))
        dispatch(setUser({}))
        router.push('/auth/login')
    }, [router, dispatch])
    
    return (
        <div></div>
    )
}

export default Reset;