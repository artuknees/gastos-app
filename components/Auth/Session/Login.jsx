import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { endpoints } from "../../../config/endpoints";
import { setSession, setUser } from "../../../redux/features/actions/session";
import { useAppDispatch } from "../../../redux/hooks";

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
        try {
            // console.log(endpoints('user_login'))
            const rsp = await axios.post(endpoints('user_login'), data);
            if (rsp.status === 401){
                console.log('failed: ', rsp.data)
            } else if (rsp.status === 200) {
                setInvalidUser(false)
                console.log('response backend: ', rsp.data)
                localStorage.setItem('logged', 'true')
                localStorage.setItem('user', JSON.stringify(rsp.data));
                dispatch(setSession(true));
                dispatch(setUser(rsp.data));
                router.push('/');
            }
        } catch(err){
            console.log(err)
            if(err.response.status === 401) {
                console.log(err.response.data.message)
                setInvalidUser(true);

            }
        }
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

    return (
        <div className="flex flex-col min-h-screen h-full w-full px-4 items-center justify-center pb-10">
                <span className="lg:text-5xl text-4xl text-left place-self-start lg:place-self-center">Welcome to <strong>Cloud <br/>Biomanufacturing</strong></span>
                <form className="flex flex-col mt-20 w-full items-center" onSubmit={() => execLogIn(userData)}>
                    <input
                        onChange={(e) => setUserData({ ...userData, username: e.target.value})}
                        type="text"
                        className="border border-black border-opacity-50 bg-gray-200 px-3.5 h-11.5 text-xs w-full lg:w-[335px]"
                        name="username"
                        id="username"
                        placeholder="Username"
                    />
                    <input
                        onChange={(e) => setUserData({ ...userData, password: e.target.value})}
                        type="password"
                        className="border border-black border-opacity-50 bg-gray-200 px-3.5 h-11.5 mt-5 text-xs w-full lg:w-[335px]"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                    <button type="submit" className={"place-self-center w-full mt-5 rounded-[60px] hover:opacity-80 p-1.5 h-11.5 lg:w-[335px]"}>Log in</button> 
                </form>
            {
                invalidUser &&
                <span className="text-red-500 text-sm mt-5">Username or password are incorrect</span>
            }


        </div>
    );
}

export default Login;