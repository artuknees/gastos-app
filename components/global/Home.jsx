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

const Home = () => {
    initFirebase();
    const auth = getAuth();
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [user, loading] = useAuthState(auth);
    useState(() => {
        const fetchData = async () => {
            if (user) {
                console.log('user: ', user);
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
        <div className="w-full h-full flex flex-col">
            { user?.displayName.length > 0  ? 
                <section>
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
                </section>
            : 
            <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
                <CircularProgress/>
            </div>}
        </div>
    )
};

export default Home;