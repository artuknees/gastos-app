import React,{useState , useEffect} from "react";
import { initFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore } from "firebase/firestore";
import { collection , getDocs, query, where } from 'firebase/firestore';
import { CircularProgress } from "@mui/material";
import { enhanceText } from "../utils/enhanceText";

const Add = ({}) => {
    const app = initFirebase();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isLoading , setIsLoading] = useState(true);
    const [categories , setCategories] = useState([]);
    const [dataPack , setDataPack] = useState({
        fecha: 0,
        categoria: '',
        comentario: '',
        valor: 0
    });
    console.log('data pack: ', dataPack)

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
                setCategories(cats);
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
            { !isLoading && categories.length > 0 ? 
                <div className="w-full h-full flex flex-col pt-4">
                    <div className="w-full flex flex-col mb-5">
                        <label htmlFor="">Fecha</label>
                        <input type='date' onChange={(e) => setDataPack({...dataPack, fecha:(((Date.parse(e.target.value))/1000)+(60*60*3))})}/>
                    </div>
                    <div className="w-full flex flex-col mb-5">
                        <label htmlFor="">Monto</label>
                        <input type='number' onChange={(e) => setDataPack({...dataPack, valor:parseInt(e.target.value)})}/>
                    </div>
                    <div className="w-full flex flex-col mb-5">
                        <label htmlFor="">Comentario</label>
                        <input type='text' onChange={(e) => setDataPack({...dataPack, comentario:e.target.value})}/>
                    </div>
                    <div className="w-full flex flex-col mb-5">
                        <label htmlFor="">Categoria</label>
                        <select onChange={(e) => setDataPack({...dataPack, categoria:e.target.value})}>
                            <option value="">Choose</option>
                            {categories.sort((a,b) => a.nombre.localeCompare(b.nombre)).map(cat => { return (
                                <option key={cat.id} value={cat.id}>{enhanceText(cat.nombre)}</option>
                            )})}
                        </select>
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

export default Add;