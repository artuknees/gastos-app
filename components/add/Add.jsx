import React,{useState , useEffect} from "react";
import { initFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFirestore } from "firebase/firestore";
import { collection , getDocs , addDoc } from 'firebase/firestore';
import { CircularProgress } from "@mui/material";
import { enhanceText } from "../utils/enhanceText";
import Swal from "sweetalert2";

const Add = ({}) => {
    const app = initFirebase();
    const auth = getAuth();
    const db = getFirestore(app)
    const [user, loading] = useAuthState(auth);
    const [isLoading , setIsLoading] = useState(true);
    const [categories , setCategories] = useState([]);
    const [dataPack , setDataPack] = useState({
        fecha: Date.now(),
        categoria: '',
        comentario: '',
        valor: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                // const db = getFirestore(app)
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
    },[user]);
    const handleSubmit = async () => { // function for form sending
        event.preventDefault();
        console.log(dataPack);
        try {
            await addDoc(collection(db, 'gastos'),{...dataPack})
            Swal.fire({ // alert the user
                icon:'success',
                title:'Enviado!',
                width:'250px',
                confirmButtonColor:'#5989FF'
            });
            setDataPack({ // reset object
                fecha: Date.now(),
                categoria: '',
                comentario: '',
                valor: 0
            })
        } catch (err) {
            console.error(err)
            Swal.fire({
                icon:'error',
                title:'Error',
                width:'250px',
                confirmButtonColor:'#5989FF'
            })
        }
    }
    return (
        <>
            { !isLoading && categories.length > 0 ? 
                <form className="w-full h-full flex flex-col pt-4" onSubmit={() => handleSubmit()}>
                    <div className="min-w-full flex flex-col mb-5 w-full">
                        <label className="font-semibold text-lg">Fecha</label>
                        <input
                            type='date'
                            value={new Date(dataPack.fecha).toISOString().slice(0, 10)}
                            onChange={(e) => setDataPack({...dataPack, fecha:(((Date.parse(e.target.value)))+(60*60*3*1000))})}
                            className={`min-w-full w-full outline-none bg-transparent appearance-none border h-[45px] rounded-full px-4 mt-2 shadow-lg ${dataPack.fecha === 0 ? 'border-black-main' : 'border-red-main'}`}
                        />
                    </div>
                    <div className="w-full flex flex-col mb-5">
                        <label className="font-semibold text-lg">Categoria</label>
                        <select
                        value={dataPack.categoria === '' ? 'Choose': dataPack.categoria}
                        onChange={(e) => setDataPack({...dataPack, categoria:e.target.value})}
                        className={`bg-transparent appearance-none outline-none border h-[45px] rounded-full px-4 mt-2 shadow-lg ${dataPack.categoria === '' ? 'border-black-main' : 'border-red-main'}`}
                        >
                            <option value="Choose" disabled>Choose</option>
                            {categories.sort((a,b) => a.nombre.localeCompare(b.nombre)).map(cat => { return (
                                <option key={cat.id} value={cat.id}>{enhanceText(cat.nombre)}</option>
                            )})}
                        </select>
                    </div>
                    <div className="w-full flex flex-col mb-5">
                        <label className="font-semibold text-lg">Monto</label>
                        <input
                        value={dataPack.valor === 0 ? '': `${dataPack.valor}`}
                        type='number'
                        placeholder="$1450"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setDataPack({...dataPack, valor:parseInt(e.target.value)})
                            } else {
                                setDataPack({...dataPack, valor: 0})
                            }
                        }}
                        className={` bg-transparent border outline-none h-[45px] rounded-full px-4 mt-2 shadow-lg ${dataPack.valor === 0 ? 'border-black-main' : 'border-red-main'}`}
                        />
                    </div>
                    <div className="w-full flex flex-col mb-5">
                        <label className="font-semibold text-lg">Comentario</label>
                        <input
                        value={dataPack.comentario}
                        type='text'
                        className={`bg-transparent border outline-none h-[45px] rounded-full px-4 mt-2 shadow-lg ${dataPack.comentario === '' ? 'border-black-main' : 'border-red-main'}`}
                        onChange={(e) => setDataPack({...dataPack, comentario:e.target.value})}
                        />
                    </div>
                    <button className='mt-6 h-[45px] w-full bg-red-main rounded-full text-gray-main shadow-lg'>Add expense</button>
                </form>
            : 
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <CircularProgress style={{'color': "#FF8173"}} size={60}/> 
                </div>
            }

        </>
    )
};

export default Add;