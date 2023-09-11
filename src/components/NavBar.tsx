import useEffect from 'react';
import useState from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ClusterSense.png';
import Select from 'react-select/async';

interface NavProps {
  setPort: (e: number) => void;
  formSubmission: (e: boolean) => void;
}

const NavBar = ({ setPort, formSubmission }: NavProps) => {
  const [clustersOptions, setClustersOptions] = useState([]);

  //navigation paths
  const navigate = useNavigate();
  const toHome = () => {
    const path: string = '/home';
    navigate(path);
  };
  const signOut = () => {
    const path: string = '/login';
    navigate(path);
    //need to ensure we end the session here so they actually log out and aren't just redirected
  };

  function handleSelect(selectedOption: number) {
    //uses setPort /formSubmission from props to set port in the mainPage, making form go away
    const chosenCluster = selectedOption;
    setPort(chosenCluster);
    formSubmission(true);
  }

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await fetch('http://localhost:4000/cluster/DB', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setClustersOptions(data);
        } else {
          console.error('Error fetching clusters');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchClusters();
  }, []);

  return (
    <div className="nav-bar">
      <div className="nav-barLogo">
        <img className="Logo" src={logo} alt="" />
      </div>
      <div className="clusters">
        Select Cluster:
        <Select
          defaultValue={clustersOptions[0]}
          onChange={handleSelect}
          Options={clustersOptions}
        />
      </div>
      <div>
        <a className="navLinks" onClick={toHome}>
          Home
        </a>
        <a className="navLinks" onClick={signOut}>
          Sign Out
        </a>
      </div>
    </div>
  );
};
export default NavBar;
