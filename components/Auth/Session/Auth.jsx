import { useRouter } from "next/router";
import { useEffect } from "react";
import { initFirebase } from "../../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import { email } from "../../../config/endpoints";

const Auth = ({ children }) => { // this is the global component inside Provider. Checks always if the user is logged.
    initFirebase();
    const router = useRouter()
    const auth = getAuth(); // instance of auth method
    const [user, loading] = useAuthState(auth);
    useEffect(() => { // login checking
        if (user && user?.email === email()){
            router.push('/')
        } else if (user && user?.email !== email()) {
            Swal.fire({
                icon: 'error',
                width: '250px',
                text: 'Permission denied'
            }).then((result) => {
                if (result.isConfirmed) {
                    auth.signOut();
                    router.push('/auth/login')
                }
            })
        }
        else {
            router.push('/auth/login')
        }
    },[user , router.pathname])

    return (
        <>{children}</>
    )
}

export default Auth;