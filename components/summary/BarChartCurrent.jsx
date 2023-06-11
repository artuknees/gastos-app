import { Chart as ChartJS , CategoryScale , LinearScale , BarElement , Title , Tooltip , Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const BarChartCurrent = (props) => {
    const {barData , barOptions} = props;
    ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
    return (
        <div className="flex flex-col w-full items-center justify-center lg:w-2/3 bg-gray-main lg:pl-4 mt-8 lg:mt-0">
            <Bar options={barOptions} data={barData} />
        </div>
    )
};

export default BarChartCurrent;