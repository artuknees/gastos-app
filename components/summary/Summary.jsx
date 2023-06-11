import React,{useState , useEffect} from "react";
import { initFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore } from "firebase/firestore";
import { collection , getDocs, doc , deleteDoc , query, where } from 'firebase/firestore';
import { CircularProgress } from "@mui/material";
import List from './List';
import GoalAnalysis from "./GoalAnalysis";
import Swal from "sweetalert2";
import DistributionChart from "./DistributionChart";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BarChartCurrent from "./BarChartCurrent";
import ChartsSection from "./ChartsSection";

const Summary = ({}) => {
    const app = initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isLoading , setIsLoading] = useState(true);
    const [categories , setCategories] = useState([]);
    const [expenses , setExpenses] = useState([]);
    const [limit , setLimit] = useState(0)
    const [selectedExpense , setSelectedExpense] = useState('');
    const [refreshFlag , setRefreshFlag] = useState(true);
    const [displayExpense , setDisplayExpense] = useState([]);
    const [amountOfDisplay, setAmountOfDisplay] = useState(10);
    const [ready , setReady] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setReady(false);
                setIsLoading(true)
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
                // get de goal
                const goalGet = await getDocs(collection(db, 'objetivo')); // get de todo lo de 'producto'
                let requestedGoal = {}; // preparo un array
                goalGet.forEach((doc) => { // le pusheo el contenido mas su id.
                    requestedGoal = {...doc.data(),id:doc.id}
                })
                setLimit(requestedGoal.monto)          
                setCategories(cats);
                setExpenses(exps);
                setDisplayExpense(exps.sort((a,b) => {return (b.fecha - a.fecha)}).slice(0,amountOfDisplay));
                setIsLoading(false);
                setReady(true);
            } else {
                setReady(false);
                setIsLoading(false)
            }
        };
        fetchData();
    },[user, refreshFlag, amountOfDisplay]);
    const handleDeleteExpense = async(item) => {
        const db = getFirestore(app)
        try {
            await deleteDoc(doc(db, 'gastos', item));
            setRefreshFlag(!refreshFlag)
        } catch(error) {
            Swal.fire({
                icon:'error',
                title: 'Error deleting'
            })
        }
    };

    return (
        <>
        { !ready && isLoading ? 
            <div className="w-full h-full flex flex-col items-center justify-center">
                <CircularProgress style={{'color': "#FF8173"}} size={60}/> 
            </div>
        :
            ready && !isLoading && categories.length === 0 && expenses.length === 0 ?
                <div className="flex flex-col w-full pt-5 items-center justify-center w-full h-full text-black-main">
                    <h1 className="text-xl lg:text-2xl font-semibold">No info to show</h1>
                    <ErrorOutlineIcon fontSize="large"/>
                </div>
            :
            ready && !isLoading && categories.length > 0 && expenses.length > 0 &&
            <div className="flex flex-col w-full pb-5 items-center">
                <GoalAnalysis expenses={expenses} limit={limit}/>
                <ChartsSection expenses={expenses} categories={categories}/>
                <List categories={categories} expenses={displayExpense} selectedExpense={selectedExpense} setSelectedExpense={setSelectedExpense}/>
                {expenses.length > amountOfDisplay && 
                    <div className="flex flex-col w-full items-end justify-center text-black-main underline cursor-pointer" onClick={() => setAmountOfDisplay(amountOfDisplay + 10)}>
                        Show more...
                    </div>
                }
                {selectedExpense !== '' && <button className='mt-10 h-[45px] w-full bg-red-main rounded-full text-gray-main shadow-lg' onClick={()=> handleDeleteExpense(selectedExpense)}>Delete expense</button>}
            </div>
        }


        </>
    )
};

export default Summary;