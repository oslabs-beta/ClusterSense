import  useState from 'react';
import  useEffect from 'react';
import MouseEvent from 'react';
import NavBar from '../components/NavBar';

const MainPage = () => {
  //need to check if user is logged in
/*
There is a bunch of logic in here for dataFromDatabase--this is theory and reflects what might come from the prometheus data scrapper to be manifested as grafana charts
*/
  const [port, setPort] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  //const [dataFromDatabase, setDataFromDatabase] = useState([]);

  const handleSubmission = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      //this will put the cluster into the database
      const response = await fetch('http://localhost:4000/cluster', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(port),
      });
      if (response.ok){
        setIsFormSubmitted(true);
      }else{
        //error handling
      }
    } catch {
      console.log('error');
    }
  };

  //useEffect that will fetch data from prometheus/backend once the form is submitted using the port
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('/data');
        if (response.ok) {
          response = await response.json();
          //setDataFromDatabase(response);
        } else {
          //error fetching data
        }
      } catch (error) {
        // network error
      }
    };
    if (isFormSubmitted) {
      fetchData();
    }
  }, [isFormSubmitted]);

  return (
    <div>
      <NavBar setPort={setPort} formSubmission={isFormSubmitted}/>
      {isFormSubmitted ? (
        <div>
           {/*dataFromDatabase.map((item: []) => (
            <div key={item.id}>{item.name}</div>
           ))*/}
        </div>
      ) : (
        <div className="mainDiv">
        <div className="clusterForm">
      <form onSubmit={handleSubmission}>
        <div className="createLabels">
          <span>Enter your JMX port for you Kafka Cluster: </span>
          <input
            className="port"
            type="text"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
      )
      }
    </div>
  );
};

export default MainPage