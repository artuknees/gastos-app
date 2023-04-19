import React,{useState , useEffect} from "react";
import { initFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore } from "firebase/firestore";
import { collection , getDocs, query, where } from 'firebase/firestore';
import { CircularProgress } from "@mui/material";

const Summary = () => {
    const app = initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isLoading , setIsLoading] = useState(true);
    const [categories , setCategories] = useState([]);
    const [expenses , setExpenses] = useState([]);
    const enhanceText = (str) => {
        return (str.charAt(0).toUpperCase() + str.slice(1))
    }

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const db = getFirestore(app)
                // get de categorias
                const categoriesGet = await getDocs(collection(db, 'categorias')); // get de todo lo de 'producto'
                const cats = []; // preparo un array
                categoriesGet.forEach((doc) => { // le pusheo el contenido mas su id.
                    cats.push({...doc.data(), id:doc.id})
                })
                // get de gastos
                const expensesGet = await getDocs(collection(db, 'gastos')); // get de todo lo de 'producto'
                const exps = []; // preparo un array
                expensesGet.forEach((doc) => { // le pusheo el contenido mas su id.
                    exps.push({...doc.data(), id:doc.id})
                })
                setCategories(cats);
                setExpenses(exps);
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        };
        setIsLoading(true)
        fetchData();
    },[user])

    return (
        <>
            { !isLoading && categories.length > 0 && expenses.length > 0 ? 
                <div className="w-full h-full flex flex-col pt-4">
                    <h1 className="text-2xl">Last expenses</h1>
                    <div className="mt-5">
                        { expenses.map(item => {return (
                            <div 
                            key={item.id}
                            className="w-full h-[102px] bg-yellow-main border border-red-main rounded-xl mb-4 flex flex-row"
                            >
                                <section className="w-1/3 flex flex-col items-center justify-evenly">
                                    <span>{enhanceText(categories[categories.findIndex(cat => cat.id === item.categoria)].nombre)}</span>
                                    <span>{`$${item.valor}`}</span>
                                    <span>{new Date(item.fecha.seconds).toLocaleDateString()}</span>
                                </section>
                                <div className="w-1/3 flex flex-col items-center justify-center">{enhanceText(item.comentario)}</div>
                                <div className="w-1/3 flex flex-col items-center justify-center">N/A</div>
                            </div>
                        )}) }
                    </div>
                </div>
            : 
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <CircularProgress style={{'color': "#FF8173"}} size={60}/> 
                </div>
            }

        </>
    )
};

export default Summary;