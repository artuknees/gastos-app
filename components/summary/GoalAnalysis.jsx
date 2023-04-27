import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const GoalAnalysis = ({expenses}) => {
    const [monthlyTotal , setMonthlyTotal] = useState(0);
    const [totalSpent , setTotalSpent] = useState('');
    const [month , setMonth] = useState('')
    const limit = 350000;
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    console.log(totalSpent)
    useEffect(()=>{
        const now = new Date(Date.now());
        const thisMonth = now.getMonth();
        setMonth(thisMonth);
        const thisYear = now.getFullYear();
        let monthTotal = 0;
        expenses.forEach(item => {
            const expenseMonth = (new Date(item.fecha)).getMonth();
            const expenseYear = (new Date(item.fecha)).getFullYear();
            if (expenseMonth === thisMonth && expenseYear === thisYear) {
                monthTotal += item.valor
            }
            setMonthlyTotal(monthTotal);
            setTotalSpent(`w-[${parseInt((monthTotal/limit)*100)}%]`)
        })
    },[expenses])
    return (
        <>
        {monthlyTotal > 0 && month !== '' && totalSpent !== '' ?
            <div className="mt-6 w-full h-[120px] border border-black-main rounded-2xl bg-yellow-main shadow-xl p-4 flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                    <h1 className="font-semibold text-xl">{months[month]}</h1>
                    <h1 className="text-lg">{`Total: $${monthlyTotal}`}</h1>
                </div>
                <div className="flex flex-col w-full h-[24px] bg-gray-main rounded-full p-0.5 border border-black-main">
                    {/* <div className={`h-full bg-blue-main rounded-full w-[90%]`}></div> */}
                    <div className={`h-full bg-blue-main rounded-full ${totalSpent !== '' && totalSpent}`}></div>
                </div>
                <div className="flex flex-row justify-end">
                    <span className="h-full text-sm">{`Limit: $${limit}`}</span>
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

export default GoalAnalysis