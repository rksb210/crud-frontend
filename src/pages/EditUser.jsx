import React, { useEffect, useState } from 'react';
import { useParams, useLocation,useNavigate } from 'react-router-dom';
import config from "../config/config";
import axios from "axios";

const EditUser = () => {
    const { userid } = useParams();
    const navigate = useNavigate()

    const location = useLocation();
    const data = location.state.user;

    // Initialize state with data values
    const [username, setUsername] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');

    const token = JSON.parse(localStorage.getItem("token"));

    useEffect(() => {
       
        setUsername(data.username || '');  // Use empty string as fallback
        setEmailId(data.emailid || '');    // Use empty string as fallback
        setPassword(data.password || '');  // Use empty string as fallback
    }, [data]);

    const handleEdit = async () => {
        const payload = {
            username,
            emailid: emailId,
            password
        };

        try {
            const response = await axios.patch(
                `${config.apiBaseURL}/edituser/${data.registration_id}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if(response.data.success){
                navigate('/getuser')
            }
            // Optionally handle success or navigate back to user list
        } catch (error) {
            console.error("Error editing user:", error);
            // Handle error response
        }
    };

    return (
        <div>
            <h2>Edit User: {data.username}</h2>
            <table className="table table-striped table_design">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
                        <td><input type="text" name="emailid" value={emailId} onChange={(e) => setEmailId(e.target.value)} /></td>
                        <td><input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /></td>
                        <td><button type="button" onClick={handleEdit}>Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EditUser;
