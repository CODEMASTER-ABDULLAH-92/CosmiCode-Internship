import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  
  
  const handleRegister = async (e)=> {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user/registerUser",{name,email,password}  ,      { headers: { "Content-Type": "application/json" }, withCredentials: true })
      const token = response.data.accessToken; // Assuming the backend returns a token
      localStorage.setItem("token", token); // Save token to localStorage
      setEmail('');
      setPassword('');
      navigate("/posts")
      setError('');
      setMessage("Register Succefully");
      navigate("/posts")
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error("ERR in Register",error);
    }
  }

  return (

       <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 mb-3 border rounded"
          />
          <button type='submit' className="w-full bg-green-600 text-white p-2 rounded">Register</button>
        </form>
        {error && <p className="text-red-500 text-start">{error}</p>}
        {message && <p className="text-green-500 text-start">{message}</p>}
      </div>
    </div>

  )
}

export default Register
