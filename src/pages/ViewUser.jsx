import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import config from "../config/config"
import axios from "axios"
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";



const ViewUser = () => {
  const { userid } = useParams()
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("token"))

  const [userData, setUserData] = useState([])
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5); // Change the size as needed
  const [total, setTotal] = useState(0)

  const UserDetails = async () => {

    const response = await axios.get(`${config.apiBaseURL}/getuser?page=${page}&size=${size}`)

    setUserData(response.data.data.users)
    setPage(response.data.data.page);
    setSize(response.data.data.size);
    setTotal(response.data.data.total);
  }

  useEffect(() => {
    UserDetails()
  }, [page, size])

  const handleLogin = () => {
       navigate('/login')
  }

  const handleEdit = (user) => {
    navigate('/edituser', { state: { user } })
  }
  const handleDelete = async (user) => {
    const id = user.registration_id
    const response = await axios.delete(`${config.apiBaseURL}/deleteuser/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    if (response.data.success) {
      alert(response.data.message)
      navigate('/')
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/')
  }


  const totalPages = Math.ceil(total / size)

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`btn ${page === i ? 'btn-primary mx-1' : 'btn-secondary mx-1'}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  }

  const handleRegister = () => {
    navigate('/registration')
  }

  return (
    <>    
    <div  className='addteam'>
      <button type="button" className="btn btn-outline-primary mr-4" onClick={handleRegister}>Register</button>
      </div>
    <table class="table table-striped table_design">
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Name</th>
          <th>Email ID</th>
          <th>Edit</th>
          <th>Delete</th>
          <th>Login</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user, index) => (
          <tr key={user.id}>
            <th scope="row">{(page - 1) * size + index + 1}</th>
            <td>{user.username}</td>
            <td>{user.emailid}</td>
            <td onClick={() => handleEdit(user)}><MdEdit /></td>
            <td onClick={() => handleDelete(user)}><RiDeleteBin5Fill /></td>

            <td><button type="button" class="btn btn-outline-primary" onClick={handleLogin}>Login</button></td>
          </tr>
        ))}

      </tbody>
    </table>

      {/* <button onClick={handleLogout}>Logout</button> */}

      <div className="pagination">
        {renderPagination()}
      </div>
    </>

  )
}

export default ViewUser