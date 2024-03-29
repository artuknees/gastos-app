import React from "react";
import { enhanceText } from "../utils/enhanceText";
import Image from "next/image";

const List = ({expenses , categories , selectedExpense , setSelectedExpense}) => {
    const handleExpenseSelection = (item) => {
        if (selectedExpense === item) {
            setSelectedExpense('')
        } else {
            setSelectedExpense(item)
        }
    };
    return (
        <div className="w-full h-full flex flex-col pt-4">
            <h1 className="text-2xl font-semibold">Last expenses</h1>
            <div className="mt-5 flex flex-col lg:grid lg:grid-cols-4 lg:gap-2 w-full h-full">
                { expenses.sort((a,b) => {return (b.fecha - a.fecha)}).map(item => {return (
                    <div 
                    key={item.id}
                    className={`w-full h-[102px] border border-black-main rounded-xl mb-4 flex flex-row shadow-xl ${selectedExpense === item.id ? 'bg-blue-main' : 'bg-yellow-main'}`}
                    onClick={() => handleExpenseSelection(item.id)}
                    >
                        <div className="w-1/4 h-full flex flex-col items-center justify-center">
                            <div className={`flex flex-col h-[52px] w-[52px] p-1 bg-gray-main shadow-lg border border-black-main rounded rounded-lg`}>
                            <Image 
                                alt='app image'
                                src={`/${(categories[categories.findIndex(cat => cat.id === item.categoria)].nombre).toLowerCase().split(' ').join('_')}.svg`}
                                height={30}
                                width={30}
                                style={{ width: 'auto', height: 'auto' }}
                                onError={() => {setSource('/vercel.svg')}}          
                            />
                            </div>
                        </div>
                        <section className="w-5/12 flex flex-col items-start justify-evenly">
                            <span className="font-bold">{enhanceText(categories[categories.findIndex(cat => cat.id === item.categoria)].nombre)}</span>
                            <span>{enhanceText(item.comentario)}</span>
                        </section>
                        <div className="w-1/3 flex flex-col items-center justify-evenly">
                            <span className="font-semibold">{`$${item.valor}`}</span>
                            <span>{new Date(item.fecha).toLocaleDateString()}</span>
                        </div>
                    </div>
                )}) }
            </div>
        </div>
    )
};

export default List;