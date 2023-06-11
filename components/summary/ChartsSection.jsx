import React, { useEffect , useState } from "react";
import DistributionChart from "./DistributionChart";
import BarChartCurrent from "./BarChartCurrent";

const ChartsSection = ({expenses , categories}) => {
    const [donnutData, setDonnutData] = useState({});
    const [donnutOptions, setDonnutOptions] = useState({});
    const [barData, setBarData] = useState({});
    const [barOptions, setBarOptions] = useState({});

    useEffect(()=>{
        const now = new Date(Date.now()); // miro la fecha de hoy
        const thisMonth = now.getMonth(); // saco el mes
        const thisYear = now.getFullYear(); // saco el anio
        let basicMonthlyCategories = [];
        let basicMonthlyExpenses = [];
        const opacity = '0.65';
        const brandColorArray = ['#FFDA80','#64FFD1','#FF8173','#5989FF','#170D21','#A573FF','#7FFF94','#FFB1CD','#FF9C66'];
        const shadedColorArray = [
            `rgba(255, 218, 128, ${opacity})`,
            `rgba(100, 255, 209, ${opacity})`, 
            `rgba(255, 129, 115, ${opacity})`, 
            `rgba(89, 137, 255, ${opacity})`, 
            `rgba(23, 13, 33, ${opacity})`, 
            `rgba(165, 115, 255, ${opacity})`, 
            `rgba(127, 255, 148, ${opacity})`, 
            `rgba(255, 177, 205, ${opacity})`, 
            `rgba(255, 156, 102, ${opacity})`
        ];
        expenses.forEach(expense => { // prepare data for both charts
            const expenseMonth = (new Date(expense.fecha)).getMonth();
            const expenseYear = (new Date(expense.fecha)).getFullYear();
            if (expenseMonth === thisMonth && expenseYear === thisYear) { // bring current month values
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
        // labels for both plots
        const labels = basicMonthlyCategories.map(item => (categories[categories.findIndex(cat => cat.id === item)].nombre).charAt(0).toUpperCase() + (categories[categories.findIndex(cat => cat.id === item)].nombre).slice(1));
        const barOptionsForSet = { // bar plot options
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                },
            },
        };
        const donnutOptionsForSet = { // donnut plot options
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position:'top'
                },
                title: {
                    display: false,
                },
            },
        };
        const barDataForSet = { // bar plot data
            labels,
            datasets: [
                {
                    data: basicMonthlyExpenses,
                    backgroundColor: shadedColorArray,
                    borderColor: brandColorArray,
                }
            ],
        };
        const donnutDataForSet = { // donnut plot data
            labels: basicMonthlyCategories.map(item => (categories[categories.findIndex(cat => cat.id === item)].nombre).charAt(0).toUpperCase() + (categories[categories.findIndex(cat => cat.id === item)].nombre).slice(1)),
            datasets: [
                {
                    label: 'Total',
                    data: basicMonthlyExpenses,
                    backgroundColor: shadedColorArray,
                    borderColor: brandColorArray,
                    borderWidth: 1,
                },
            ],
        };
        // set variables
        setDonnutOptions(donnutOptionsForSet);
        setDonnutData(donnutDataForSet)
        setBarOptions(barOptionsForSet);
        setBarData(barDataForSet)
    },[expenses]);

    return(
        <section className="w-full lg:max-h-[500px] h-fit flex flex-col lg:flex-row lg:px-8 mt-8">
            {donnutData?.datasets && donnutOptions?.plugins && barData?.datasets && barOptions?.plugins && 
                <>
                    <DistributionChart donnutData={donnutData} donnutOptions={donnutOptions}/>
                    <BarChartCurrent barData={barData} barOptions={barOptions}/>
                </>
            }
        </section>
    )

};

export default ChartsSection;