
import { useState } from 'react'
import '../../App.css'
import config from '../../config/config'
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate()

    const [username,setUserName] = useState('')
    const [emailID,setEmailID] = useState('')
    const [password,setPassword] = useState('')

const handleSignup = async () =>{
   try {
    const payload = {
        username,
        emailid:emailID,
        password
    }
    const response = await axios.post(`${config.apiBaseURL}/register`, payload)
    if(response.data.success){
        navigate('/')
    }
    
   } catch (error) {
    console.log(error)
   }

}

    return (
        <div className='wrapper'>
            <form>
                <h1>Registration</h1>
                <input type="text" className="form-control" placeholder="Username" onChange={(e)=>setUserName(e.target.value)} />
                <input type="email" className="form-control" placeholder="Email Id" onChange={(e)=>setEmailID(e.target.value)} />
                <input type="password" className="form-control" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="button" class="btn btn-outline-success" onClick={handleSignup}>Sign Up</button>
                {/* <button type="button" class="btn btn-outline-success">Success</button> */}
                <p>Already have an account <a href='/'>login</a></p>
            </form>
        </div>
    )
}

export default Registration