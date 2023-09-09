import React, {useState} from "react";



const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    let navigate = useNavigate();
    const goLogin = () => {
      let path = "/login";
      navigate(path);
    };
    const toHome = () => {
      let path = "/home";
      navigate(path);
    };
  
    const handleClick = async () => {
    
      try{
        const body = {
          username: username,
          password: password
        }
          const data = await fetch(`http://localhost:4000/login/signupRequest`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        if (data.ok) {
          toHome()
        }
      } catch(err){
        //render error in front end
        console.log(err);
      }
  
    }
    
    return (
      <div className="signInPage">
        <div className="signInContainer">
          <h2>Sign Up:</h2>
          <div className="signInBox">
              <input name="username" type="text" placeholder="username" value = {username} onChange={(e) => setUsername(e.target.value)}/>
              <input name="password" type="password" placeholder="password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
              <button onClick={handleClick}>Sign Up</button>
              <button onClick={goLogin}>Back to Log In</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignUp;
  