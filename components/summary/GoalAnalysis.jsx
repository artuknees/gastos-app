import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const GoalAnalysis = ({expenses , limit}) => {
    const [monthlyTotal , setMonthlyTotal] = useState(0);
    const [totalSpent , setTotalSpent] = useState(0);
    const [month , setMonth] = useState('');
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
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
            setTotalSpent(parseInt((monthTotal/limit)*100))
        })
    },[expenses]);

    const BorderLinearProgress = styled(LinearProgress)(() => ({
        height: 24,
        borderRadius: 12,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: "#F3F3F2",
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 12,
          backgroundColor: "#5989FF",
        },
    }));

    return (
        <>
        {monthlyTotal > 0 && month !== '' ?
            <div className="mt-6 w-full h-[120px] border border-black-main rounded-2xl bg-yellow-main shadow-xl p-4 flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                    <h1 className="font-semibold text-xl">{months[month]}</h1>
                    <h1 className="text-lg">{`Total: $${monthlyTotal}`}</h1>
                </div>
                

                <div className="flex flex-col w-full h-[24px] bg-gray-main rounded-full p-0.5 border border-black-main">
                    <BorderLinearProgress variant="determinate" value={totalSpent > 100 ? 100 : totalSpent} />
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