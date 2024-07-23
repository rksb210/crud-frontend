import axios from 'axios'
import React, { useState } from 'react'
import config from "../config/config";
import { useNavigate, useParams } from 'react-router-dom';



const AddTeam = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const token = JSON.parse(localStorage.getItem('token'));
    const [username, setUsername] = useState("")
    const [designation, setDesignation] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [salary, setSalary] = useState("")

    const handleSubmit = async () => {
        let payload = {
            member_name: username,
            designation,
            phonenumber,
            salary
        }
        const response = await axios.post(`${config.apiBaseURL}/addteam/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } })
        if(response.data.success){
            navigate(`/team/${id}`)
        }
    }

    return (
        <>
            <div className='add-container'>
                <div className='add-subcontainer'>
                    <input type='text' class="form-control" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                    <input type='text' class="form-control" placeholder='Designation' onChange={(e) => setDesignation(e.target.value)} />
                    <input type='text' class="form-control" placeholder='Phone Number' onChange={(e) => setPhonenumber(e.target.value)} />
                    <input type='number' class="form-control" placeholder='Salary' onChange={(e) => setSalary(e.target.value)} min={0} />
                </div>
                <div className='add-button'>
                    <button type='button' class="btn btn-outline-success" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default AddTeam