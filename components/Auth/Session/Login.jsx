import { useRouter } from "next/router";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { initFirebase } from "../../../firebase";
import { GoogleAuthProvider , getAuth , signInWithPopup  } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from "@mui/material";
import budget from '../../../public/budget.svg';
import Image from "next/image";

const Login = () => {
    initFirebase();
    const router = useRouter()
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
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }

    return (
        <div className="flex flex-col h-full min-h-screen">
            <div className="flex flex-col flex-auto px-4 justify-center">
                <h1 className="text-5xl mb-4">Welcome to</h1>
                <h1 className="text-5xl mb-6 text-red-main">budget app</h1>
                <div className="flex flex-col items-center mb-6">
                    <Image src={budget} width={125} height={125}/>
                </div>
                <button className="w-full border h-[45px] bg-red-main rounded-full text-gray-main" onClick={() => signIn()}>Log in with google</button>
            </div>
            <div className="flex-col h-[32px] text-sm bg-black-main text-gray-main w-full text-center leading-[32px] font-semibold">Made with ♥ in Villa Urquiza</div>

        </div>
    );
}

export default Login;