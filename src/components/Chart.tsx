import { useState, useEffect } from 'react';
import ReactElement from 'react';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

type ChartProps = {
  port: number;
  query: string;
  title: string;
};

const loading = {
  labels: [],
  datasets: [
    {
      label: 'Loading',
      data: [],
      backgroundColor: 'rgba(255,0,0)',
      borderColor: 'rgba(255,0,0)',
      borderWidth: 2,
      pointRadius: 4,
      pointBackgroundColor: 'rgba(255,0,0)',
    },
  ],
};
type DataPoint = string[][];
type Data = string[]

//rounds the value to 4 decimals and returns values for Charts.js to use
const organizeData = (array: DataPoint) => {
  //const time = [];
  const value: string[] = [];
  array.forEach((el: Data) => {
    if (el[1].length > 5 && el[1].includes('.')) {
      el[1] = el[1].slice(0, 5);
    }
    //time.push(new Date(el[0] * 1000).toLocaleTimeString());
    value.push(el[1]);
  });

  const newChartData = {
    labels: [
      'T-2:30',
      'T-2:00',
      'T-1:30',
      'T-1:00',
      'T-0:30',
      'T-0:00',
    ],
    datasets: [
      {
        label: 'Sample Line Chart',
        data: value,
        backgroundColor: 'rgba(255,0,0)',
        borderColor: 'rgba(255,0,0)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(255,0,0)',
      },
    ],
  };
  return newChartData;
};

const Chart: React.FC<ChartProps> = ({ port, query, title }: ChartProps): ReactElement => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );
  const [data, setData] = useState(loading);

  const url = `http://localhost:${port}/api/v1/query?query=${query}[1m]`;

  useEffect(() => {
    if (!port || !data) return undefined;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.data.data.result[0].values) {
          const array = response.data.data.result[0].values;
          setData(organizeData(array));
        }
      } catch (err) {
        console.log(err);
        return;
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [data, port]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 1000,
    },
    scales: {
      y: {
        ticks: {
          color: '#black',
        },
      },
      x: {
        ticks: {
          color: '#black',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        position: 'top' as const,
        text: `${title}`,
        color: '#black',
        align: 'start' as const,
        padding: {
          top: 10,
          bottom: 15,
        },
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default Chart;
