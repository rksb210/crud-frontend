
import { useState } from 'react'
import '../../App.css'
import config from '../../config/config'
import axios from "axios"
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()  
    const [emailID,setEmailID] = useState('')
    const [password,setPassword] = useState('')

const handleLogin = async () =>{
   try {
    const payload = { 
        emailid:emailID,
        password
    }   
    const response = await axios.post(`${(config.apiBaseURL)}/login`,payload)
    if(response.data.success){
        const id  = response.data.data.registration_id
        localStorage.setItem("token",JSON.stringify(response.data.data.token))
        navigate(`/team/${id}`);
    }    
   } catch (error) {
    console.log(error)
   }

}

    return (
        <div className='wrapper'>
            <form>
                <h1>Login</h1>
                <input type="email" className="form-control" placeholder="Email Id" onChange={(e)=>setEmailID(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="button" class="btn btn-outline-success" onClick={handleLogin}>Login</button>
                <p>Didn't have an account <a href='/registration'>signup</a></p>
            </form>
        </div>
    )
}

export default Login