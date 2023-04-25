import React,{useEffect,useState} from "react";
// import { useAppSelector } from "../../redux/hooks";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { endpoints } from "../../config/endpoints";
import {  getAuth   } from "firebase/auth";
import { initFirebase } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
// import { CircularProgress } from "@mui/material";
// import { db } from "../../firebase";
// import { collection , getDocs, query, where } from 'firebase/firestore';
// import Image from "next/image";
import NavBar from "./NavBar";
import Profile from "../profile/Profile";
import Summary from "../summary/Summary";
import Add from "../add/Add";


const Home = () => {
    initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [mode , setMode] = useState('summary');
    const modes = ['summary','add','report','profile'];
   
    return(
        <div className="w-full h-screen flex flex-col">
            <div className="flex-none flex flex-col items-center justify-center h-[80px] bg-red-main rounded-b rounded-b-[20px] shadow-xl">
                <h1 className="text-3xl font-bold text-gray-main">{mode.charAt(0).toUpperCase() + mode.slice(1)}</h1>
            </div>
            <div className="flex-auto h-full flex flex-col overflow-y-auto scrollbar shadow-lg">
                <div className="px-5 h-full w-full">
                    {mode === 'summary' && <Summary/>}
                    {mode === 'add' && <Add/>}
                    {mode === 'profile' && <Profile/> }
                </div>
            </div>
            <NavBar mode={mode} modes={modes} setMode={setMode}/>
        </div>
    )
};

export default Home;