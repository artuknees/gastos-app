import React,{useState , useEffect} from "react";
import { initFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore } from "firebase/firestore";
import { collection , getDocs, doc , deleteDoc , query, where } from 'firebase/firestore';
import { CircularProgress } from "@mui/material";
import List from './List';
import GoalAnalysis from "./GoalAnalysis";

const Summary = ({}) => {
    const app = initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isLoading , setIsLoading] = useState(true);
    const [categories , setCategories] = useState([]);
    const [expenses , setExpenses] = useState([]);
    const [selectedExpense , setSelectedExpense] = useState('');
    const [refreshFlag , setRefreshFlag] = useState(true);
    const [displayExpense , setDisplayExpense] = useState([]);
    const [amountOfDisplay, setAmountOfDisplay] = useState(10);

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
                setDisplayExpense(exps.sort((a,b) => {return (b.fecha - a.fecha)}).slice(0,amountOfDisplay))
            } else {
                setIsLoading(false)
            }
        };
        setIsLoading(true)
        fetchData();
    },[user, refreshFlag, amountOfDisplay]);
    const handleDeleteExpense = async(item) => {
        const db = getFirestore(app)
        try {
            await deleteDoc(doc(db, 'gastos', item));
            setRefreshFlag(!refreshFlag)
        } catch(error) {
            console.error(error)
        }
    };

    return (
        <>
            { !isLoading && categories.length > 0 && expenses.length > 0 ?
                <div className="flex flex-col w-full pb-5">
                    <GoalAnalysis expenses={expenses}/>
                    <List categories={categories} expenses={displayExpense} selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense}/>
                    {expenses.length > amountOfDisplay && 
                        <div className="flex flex-col items-end justify-center text-black-main underline cursor-pointer" onClick={() => setAmountOfDisplay(amountOfDisplay + 10)}>
                            Show more...
                        </div>
                    }
                    {selectedExpense !== '' && <button className='mt-10 h-[45px] w-full bg-red-main rounded-full text-gray-main shadow-lg' onClick={()=> handleDeleteExpense(selectedExpense)}>Delete expense</button>}
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