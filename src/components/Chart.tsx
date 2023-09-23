import { ReactElement, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';
import axios from 'axios';

type ChartProps = {
  port: number;
  query: string;
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

const organizeData = (array) => {
  const time = [];
  const value = [];
//   console.log(array);

  array.forEach((el) => {
    if (el[1].length > 5 && el[1].includes('.')) {
      el[1] = el[1].slice(0, 5);
    }
    time.push(new Date(el[0] * 1000).toLocaleTimeString()); //el[0] is the time
    value.push(el[1]); //el[1] is the val
  });

  const newChartData = {
    labels: [
      'T-5:00',
      '',
      'T-4:30',
      '',
      'T-4:00',
      '',
      'T-3:30',
      '',
      'T-3:00',
      '',
      'T-2:30',
      '',
      'T-2:00',
      '',
      'T-2:30',
      '',
      'T-1:00',
      '',
      'T-1:30',
      '',
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

const Chart: React.FC<ChartProps> = ({ port, query }): ReactElement => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );
  const [data, setData] = useState(loading);

  const url = `http://localhost:${port}/api/v1/query?query=${query}[20m]`;

  useEffect(() => {
    if (!port || !data) return undefined;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.data.data.result[0].values) {
          const array = response.data.data.result[0].values;
          // we can push to an array here (and it doesnt exceed 20 data points and if it does take the first element out and push new element in)
        //   let newarray=[...data, array[0][1]]
        //   if (newarray.length>20){
        //     newarray = newarray.slice(1)
        //   }
        //   console.log('newarr',newarray)
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
  }, [data]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 0,
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
        text: `${query}`,
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
export { organizeData };
