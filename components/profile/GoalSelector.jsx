import React,{useState , useEffect} from "react";
import { initFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore } from "firebase/firestore";
import { collection , getDocs, doc , deleteDoc , query, where , updateDoc } from 'firebase/firestore';
import { CircularProgress, InputAdornment, ThemeProvider, createTheme } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const GoalSelector = () => {
    const app = initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isLoading , setIsLoading] = useState(true);
    const [refreshFlag , setRefreshFlag] = useState(true);
    const [editionLoading , setEditionLoading] = useState(false);
    const [currentGoal , setCurrentGoal] = useState({
        date: 0,
        amount: 0,
        details: '',
        id: ''
    });
    const [originalGoal , setOriginalGoal] = useState({
        amount: 0,
        details: '',
    })
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FF8173',
            },
        },
    });
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const db = getFirestore(app)
                // get de goal
                const goalGet = await getDocs(collection(db, 'objetivo')); // get de todo lo de 'producto'
                let requestedGoal = {}; // preparo un array
                goalGet.forEach((doc) => { // le pusheo el contenido mas su id.
                    requestedGoal = {...doc.data(),id:doc.id}
                })
                setOriginalGoal({
                    amount: requestedGoal.monto,
                    details: requestedGoal.detalle,
                })
                setCurrentGoal({
                    date: requestedGoal.fecha,
                    amount: requestedGoal.monto,
                    details: requestedGoal.detalle,
                    id: requestedGoal.id    
                })          
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        };
        setIsLoading(true)
        fetchData();
    },[user, refreshFlag]);
    const handleChangeLimit = async () => {
        try {
            setEditionLoading(true);
            const db = getFirestore(app);
            await updateDoc(doc(db, "objetivo", currentGoal.id ), {
                monto: currentGoal.amount,
                detalle: currentGoal.details,
                fecha: Date.now(),
            });
            setEditionLoading(false);
        } catch(err) {
            setEditionLoading(false);
            console.error(err)
        }
    };
    return (
        <>
            {isLoading && 
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <CircularProgress style={{'color': "#FF8173"}} size={60}/> 
                </div>
            }
            {!isLoading && currentGoal.date > 0 & originalGoal.amount > 0 ?
                <div className="w-full flex flex-col text-black-main pt-5 items-center">
                        <h1 className="text-xl lg:text-2xl font-semibold w-full text-start">Current goal</h1>
                        <section className="w-full flex flex-col lg:flex-row">
                        <ThemeProvider theme={theme}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Amount"
                                    value={originalGoal.amount.toString()}
                                    variant="outlined" 
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        readOnly: true
                                    }}
                                    focused={true}
                                    fullWidth 
                                    sx={{my: '16px' , mx: {lg: '8px'}}}
                                />
                                <TextField 
                                    id="outlined-basic" 
                                    label="Details" 
                                    value={originalGoal.details}
                                    variant="outlined" 
                                    InputProps={{
                                        readOnly: true
                                    }}
                                    focused={true}
                                    fullWidth 
                                    sx={{my: '16px' , mx: {lg: '8px'}}}
                                />
                            </ThemeProvider>
                        </section>
                        <h1 className="text-xl lg:text-2xl font-semibold w-full text-start mt-4">Set new goal</h1>
                        <section className="w-full flex flex-col lg:flex-row">
                            <ThemeProvider theme={theme}>
                                <TextField 
                                    id="outlined-basic" 
                                    label="Amount" 
                                    variant="outlined" 
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        type: 'number'
                                    }}
                                    onChange={(e) => {setCurrentGoal({...currentGoal, amount: parseInt(e.target.value)})}} 
                                    fullWidth 
                                    sx={{my: '16px' , mx: {lg: '8px'}}}
                                />
                                <TextField 
                                    id="outlined-basic" 
                                    label="Details" 
                                    variant="outlined" 
                                    InputProps={{
                                        type: 'string'
                                    }}
                                    onChange={(e) => {setCurrentGoal({...currentGoal, details: e.target.value})}} 
                                    fullWidth 
                                    sx={{my: '16px' , mx: {lg: '8px'}}}
                                />
                            </ThemeProvider>

                        </section>
                        <ThemeProvider theme={theme}>
                            <Button
                                variant="contained" 
                                color="primary" 
                                className="bg-red-main"
                                onClick={() => {handleChangeLimit()}}
                                sx={{mt: '16px' , width: {lg: '1/3'} , color: '#F3F3F2'}}
                                fullWidth
                            >
                                Save goal
                            </Button>
                        </ThemeProvider>
                        { editionLoading && 
                            <div className="w-full h-full flex flex-col items-center justify-center mt-6">
                                <CircularProgress style={{'color': "#FF8173" , marginBottom: 16}} size={40}/> 
                                <span>Applying changes</span>
                            </div>                    
                        }
                </div>
            :
                <div className="flex flex-col w-full pt-5 items-center justify-center w-full h-full text-black-main">
                    <h1 className="text-xl lg:text-2xl font-semibold">No goal was set</h1>
                    <ErrorOutlineIcon fontSize="large"/>
                </div>
            }
       
        </>
    )
};

export default GoalSelector