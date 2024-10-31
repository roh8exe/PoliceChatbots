import { useState } from "react";
import "./PCCStatus.css";  // Import the CSS file

function PCCStatus() {
    const [token, setToken] = useState("");
    const [err, setErr] = useState("");
    const [userStatus, setUserStatus] = useState("");

    const getStatus = async () => {
    try{
        const response = await fetch("https://hackathon-second.vercel.app/PCCStatus", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status === 402) {
            setErr("Create new application");
        } else {
            setUserStatus(data.status);
        }
    }catch(e){
        console.log("err");
        setErr("Invalid Token")
    }
    }

    return (
        <div className="pcc-container">
            <h2 className="pcc-header">Check Your PCC Status</h2>
            <input 
                className="pcc-input" 
                placeholder="Enter Your Token" 
                type="text" 
                value={token} 
                onChange={(e) => setToken(e.target.value)} 
            />
            <button className="pcc-button" onClick={getStatus}>Check Status</button>
            <div className="pcc-status">
                {err ? <span className="pcc-error">{err}</span> : userStatus}
            </div>
        </div>
    );
}

export default PCCStatus;
