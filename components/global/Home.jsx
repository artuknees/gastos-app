import React,{useEffect,useState} from "react";
// import { useAppSelector } from "../../redux/hooks";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { endpoints } from "../../config/endpoints";
import {  getAuth   } from "firebase/auth";
import { initFirebase } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from "@mui/material";


const Home = () => {
    initFirebase();
    const auth = getAuth();
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [user, loading] = useAuthState(auth);
    useState(() => {
        if (user) {
            console.log('user: ', user)
        }
    },[user])
   
    const logOut = () => {
        console.log('out');
        auth.signOut();
        localStorage.setItem('logged', 'false');
        console.log('signed out')
    };

    return(
        <div className="w-full h-full flex flex-col">
            { user?.displayName.length > 0  ? 
                <section>
                    { user?.email === 'artuknees@gmail.com' ? 
                        <div>
                            <div>
                                {`Hola ${user?.displayName}`}
                            </div>
                            <button className='mt-10 w-[350px] bg-red-200' onClick={()=> logOut()}>log out</button>
                            {/* {categories.length > 0 && expenses.length > 0 && 
                                <div>
                                    {expenses.map((item, index) => {
                                        return (
                                            <div key={index} className='flex flex-row w-full justify-evenly'>
                                                <span>{item.Detalles}</span>
                                                <span>{categories[categories.findIndex(element => element.id == item.Categoria.Nombre)].Nombre}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            } */}
                        </div>
                    :
                        <div>
                            <div>
                                Hola extranio - no estas autorizado a estar aca
                            </div>
                            <button className='mt-10 w-[350px] bg-red-200' onClick={()=> logOut()}>log out</button>

                        </div>
                    }




                </section>
            : 
            <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
                <CircularProgress/>
            </div>}
        </div>
    )
};

export default Home;