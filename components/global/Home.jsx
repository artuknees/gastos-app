import React,{useEffect,useState} from "react";
// import { useAppSelector } from "../../redux/hooks";
import axios from "axios";
// import { useRouter } from "next/router";
import { endpoints } from "../../config/endpoints";
import {  getAuth   } from "firebase/auth";
import { initFirebase } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from "@mui/material";
import { db } from "../../firebase";
import { collection , getDocs, query, where } from 'firebase/firestore';
import Image from "next/image";
import NavBar from "./NavBar";


const Home = () => {
    initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [mode , setMode] = useState('summary');
    const modes = ['summary','add','report','profile'];
    useState(() => {
        const fetchData = async () => {
            if (user) {
                // const uid = user.auth.currentUser.uid;
                // const rsp = await axios.get(`${endpoints('categories')}`);
                // const rsp = await axios.get(`${endpoints('categories')}/hola`);
                // const rsp = await axios.get('http://localhost:3000/api/categories/get/hola');
                // console.log(rsp)
                // const res = db.collection('categorias').where("uid", "==", uid).get();
                // console.log(res)

                // const querySnapshot = await getDocs(collection(db, 'categorias')); // get de todo lo de 'producto'
                // const docs = []; // preparo un array
                // querySnapshot.forEach((doc) => { // le pusheo el contenido mas su id.
                //   docs.push({...doc.data(), id:doc.id})
                // })
                // console.log(docs)
            }
        };
        fetchData();
    },[user])
   
    const logOut = () => {
        console.log('out');
        auth.signOut();
        localStorage.setItem('logged', 'false');
        console.log('signed out')
    };

    return(
        <div className="w-full h-screen flex flex-col">
            <div className="flex-auto h-full">
                <div className="h-[80px] bg-red-main rounded-b rounded-b-[20px] text-3xl flex flex-col items-center justify-center font-bold text-gray-main">{mode.charAt(0).toUpperCase() + mode.slice(1)}</div>
                <div className="w-full px-4">
                    {mode === 'profile' && <button className='mt-10 h-[45px] w-full bg-red-main rounded-full text-gray-main' onClick={()=> logOut()}>Log out</button> }
                </div>
            </div>
            <NavBar mode={mode} modes={modes} setMode={setMode}/>
        </div>
    )
};

export default Home;