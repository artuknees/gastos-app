import React,{useEffect,useState} from "react";
import { useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { endpoints } from "../../config/endpoints";

const Home = () => {
    const { logged , user } = useAppSelector(state => state.session);
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const allExpenses = (await axios.get(endpoints('expenses'))).data;
            console.log('all expenses: ', allExpenses);
            const allCategories = (await axios.get(endpoints('categories'))).data;
            console.log('all categories: ', allCategories);
            setExpenses(allExpenses);
            setCategories(allCategories);
        }
        fetchData();
    },[])

    return(
        <div className="w-full h-full flex flex-col">
            { logged && 
                <section>
                    <div>
                        {`Hola ${user.username}`}
                    </div>
                    {categories.length > 0 && expenses.length > 0 && 
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
                    }
                </section>
            }
        </div>
    )
};

export default Home;