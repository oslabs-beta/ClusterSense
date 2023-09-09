import useState from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ClusterSense.png';
import AsyncSelect from 'react-select/async';


const NavBar = () => {
  //navigation paths
  let navigate = useNavigate();
  const toHome = () => {
    const path: string = '/home';
    navigate(path);
  };
  const signOut = () => {
    const path: string = '/login';
    navigate(path);
    //need to ensure we end the session here so they actually log out and arent just redirected
  };

  const [selectedCluster, setSelectedCluster] = useState(null)
  function handleSelect (event){
    setSelectedCluster(event.target.value)
    //get rid of form when selected
  }

  const clusters = async () => {
    //retreive clusters from user's DB - should be array of objects with value / label keys
    //fetch to back end useEffect
  };

  return (
    <div className="nav-bar">
      <div className="nav-barLogo">
        <img className="Logo" src={logo} alt="" />
      </div>
      <div className="clusters">
        Select Cluster:
      <AsyncSelect
        value={selectedCluster}
        onChange={handleSelect}
        options={clusters}
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
