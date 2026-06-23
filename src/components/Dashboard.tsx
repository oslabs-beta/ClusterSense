import Chart from './Chart.tsx';

interface DashboardProps {
  port: string;
}

const Dashboard = ({ port }: DashboardProps) => {
  return (
    <div className="flex flex-col justify-center items-center content-center p-20">
      <div className="flex justify-center gap-x-20 flex-wrap w-screen p-8">
        <div className="w-1/4 h-1/3">
          <Chart
            port={port}
            query="kafka_server_replicamanager_underreplicatedpartitions"
            title="Under Replicated Partitions"
          />
        </div>
        <div className="w-1/4 h-1/3">
          <Chart
            port={port}
            query="kafka_controller_kafkacontroller_globaltopiccount"
            title="Topics"
          />
        </div>
        <div className="w-1/4 h-1/3">
          <Chart
            port={port}
            query="process_cpu_seconds_total"
            title="CPU Usage"
          />
        </div>
      </div>
      <div className="flex items-center justify-evenly gap-x-20 p-24 mt-10 flex-wrap w-screen">
        <div className="w-1/4 h-1/4">
          <Chart
            port={port}
            query="kafka_server_brokertopicmetrics_bytesin_total"
            title="Bytes In"
          />
        </div>
        <div className="w-1/4 h-1/4">
          <Chart
            port={port}
            query="kafka_server_brokertopicmetrics_bytesout_total"
            title="Bytes Out"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;