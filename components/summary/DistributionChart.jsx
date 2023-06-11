import { Chart as ChartJS,ArcElement,Tooltip,Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const DistributionChart = (props) => {
    const {donnutData , donnutOptions } = props;
    ChartJS.register(ArcElement, Tooltip, Legend); // for donnut chart
    return (
        <div className="flex flex-col w-full lg:w-1/3 items-end bg-gray-main">
            <Doughnut data={donnutData} options={donnutOptions} />
        </div>
    )
};

export default DistributionChart