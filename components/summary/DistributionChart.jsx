import React,{useEffect , useState} from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';


const DistributionChart = ({expenses , categories}) => {
    const [monthlyExpenses, setMonthlyExpenses] = useState([]);
    const [monthlyCategories, setMonthlyCategories] = useState([]);

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(()=>{
        const now = new Date(Date.now()); // miro la fecha de hoy
        const thisMonth = now.getMonth(); // saco el mes
        const thisYear = now.getFullYear(); // saco el ano
        let basicMonthlyCategories = [];
        let basicMonthlyExpenses = [];
        let colorArray = [];

        expenses.forEach(expense => {
            const expenseMonth = (new Date(expense.fecha)).getMonth();
            const expenseYear = (new Date(expense.fecha)).getFullYear();
            if (expenseMonth === thisMonth && expenseYear === thisYear) {
                if (basicMonthlyCategories.includes(expense.categoria)) {
                    const index = basicMonthlyCategories.findIndex(item => item === expense.categoria); // encuentro donde esta
                    let newExpenses = [...basicMonthlyExpenses]; // genero una copia
                    const oldValue = newExpenses[index]; // extraigo el valor en ese indice
                    newExpenses[index] = oldValue + expense.valor; // le sumo el gasto actual
                    basicMonthlyExpenses = newExpenses; // lo empujo en el array actual
                } else {
                    let newCategories = [...basicMonthlyCategories];
                    newCategories.push(expense.categoria); // incluyo la categoria nueva
                    basicMonthlyCategories = newCategories; // lo igual a la variable que manejo
                    let newExpenses = [...basicMonthlyExpenses];
                    newExpenses.push(expense.valor); // incluyo un nuevo gasto de una categoria que no tenia
                    basicMonthlyExpenses = newExpenses; // lo igualo a los gastos generales
                }
            }
        });
        categories.forEach(cat => { // for color palette generation
            const firstValue = parseInt(Math.random()*255);
            const secondValue = parseInt(Math.random()*255);
            const thirdValue = parseInt(Math.random()*255);
            const finalColor = `rgba(${firstValue},${secondValue},${thirdValue},0.6)`
            colorArray.push(finalColor);
        })
        setMonthlyCategories(basicMonthlyCategories);
        setMonthlyExpenses(basicMonthlyExpenses);
        const data = {
            labels: basicMonthlyCategories.map(item => (categories[categories.findIndex(cat => cat.id === item)].nombre).charAt(0).toUpperCase() + (categories[categories.findIndex(cat => cat.id === item)].nombre).slice(1)),
            datasets: [
              {
                label: 'Total',
                data: basicMonthlyExpenses,
                backgroundColor: colorArray,
                borderWidth: 1,
              },
            ],
        };
        const options = {
            plugins: {
            },
        };
        setChartData(data);
        setChartOptions(options);
    

    },[expenses]);
    ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


    return (
        <div className="flex flex-col sm:w-[50%] w-full bg-gray-main relative mt-8">
            { chartData?.datasets && chartOptions?.plugins && 
                <PolarArea
                data={chartData}
                options={chartOptions}
            />
            
            }
        </div>
    )
};

export default DistributionChart