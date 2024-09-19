import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
  const navigate = useNavigate();
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      let response = await fetch("http://localhost:8080/home/new", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      let result = await response.json();
      if (result.success) {
        navigate("/");
      } else {
        alert(result.message);
      }


    } catch (error) {
      console.log("Error:", error);
    }
  }

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className="container mt-5">
      <h2 style={{ marginLeft: "40%" }}>Register User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={handleOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={handleOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" id="location" name="location" value={credentials.location} onChange={handleOnChange} />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className="m-3 btn btn-primary">Already a User</Link>
      </form>
    </div>
  );
}
