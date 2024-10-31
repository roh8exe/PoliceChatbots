import { useState } from "react";
import './admin.css'
import img from '/goa_image.png'
function Admin() {
  const [Status, setStatus] = useState('');
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verb, setVerb] = useState('');
  const changeStatus = async () => {
    // TRY
    const response = await fetch("https://hackathon-second.vercel.app/admin", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name : name,
        password : password,
        token: token,
        status : Status
       })
    });
    if(response.status === 401){
        setVerb('Wrong attempt')
    }
    else if (response.ok) {
      const data = await response.json();
      setVerb(data.status);
    } else {
      setVerb('Error');
    }
    
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={img} alt="Official Logo" />
        </div>
        <div className="title">Admin Panel</div>
      </div>
      
      <div className="container1">
        <input className="inputField" placeholder="Enter your admin usernane" value={name} onChange={(e) => (setName(e.target.value))}></input>
        <input className="inputField" placeholder="Enter your admin password" value={password} onChange={(e) => (setPassword(e.target.value))}></input>
        <input 
          className="inputField"
          placeholder="Enter Token of the person of whome you want to change the status of" 
          value={token} 
          onChange={(e) => setToken(e.target.value)} 
        />
        <input className="inputField" placeholder="Enter Changed Status"
        value={Status} onChange={(e) => setStatus(e.target.value)} />
        <button className="updateButton" onClick={changeStatus}>Update</button>
        <div className="statusDisplay">{verb ? verb : ""}</div>
      </div>
    </>
  );
}

export default Admin;
