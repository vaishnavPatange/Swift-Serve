import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const handleSubmit = async (evt) => {
      evt.preventDefault();
      try {
        let response = await fetch("http://localhost:8080/home/login", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        });
  
        let result = await response.json();
        if(result.success){
            localStorage.setItem("authToken", result.authToken);
            localStorage.setItem("userEmail", credentials.email);
            // console.log(localStorage.getItem("userEmail"));
            navigate("/");
        }else{
            alert("please login with valid credentials!");
        }
  
      } catch (error) {
        console.log("Error:", error);
      }
    }

    const handleOnChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
      }

    return(<div className="container mt-5">
        <h2 style={{marginLeft:"40%"}}>User Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleOnChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleOnChange} />
      </div>
      <button type="submit" className="m-3 btn btn-success">Login</button>
      <Link to="/signup" className="m-3 btn btn-primary">New User</Link>
    </form>
  </div>)
}