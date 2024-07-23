import React, { useEffect, useState } from 'react';
import config from '../config/config';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Modal, Button, Form } from 'react-bootstrap';
import "../App.css"
import Sidebar from './Sidebar';
import Header from '../components/Header';

const AllTeamMember = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const token = JSON.parse(localStorage.getItem('token'));
  const [userData, setUserData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    member_name: '',
    designation: '',
    phonenumber: '',
    salary: '',
  });

  const UserDetails = async () => {
    const response = await axios.get(`${config.apiBaseURL}/getteam/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserData(response.data.data);
  };

  useEffect(() => {
    UserDetails();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setModalOpen(true);
  };

  const handleDelete =async (user) => {
    const id = user.team_id
    const response = await axios.delete(`${config.apiBaseURL}/deleteteam/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    if (response.data.success) {
      alert(response.data.message)
      UserDetails()
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSave = async () => {
    try {
      await axios.patch(
        `${config.apiBaseURL}/updateteam/${selectedUser.team_id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      UserDetails(); 
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };

  const handleAddTeam = ()=>{
    navigate(`/addteam/${id}`)
  }

  return (
    <>
    <Header/>
    <Sidebar/>
      <h1 className='heading'>{userData?.username}</h1>
      <div  className='addteam'>
      <button type="button" className="btn btn-outline-primary mr-4" onClick={handleAddTeam}>Add Team</button>
      </div>
      <table className='table table-striped table_design'>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Phone Number</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user.id}>
              <th scope='row'>{index + 1}</th>
              <td>{user.member_name}</td>
              <td>{user.designation}</td>
              <td>{user.phonenumber}</td>
              <td>{user.salary}</td>
              <td onClick={() => handleEdit(user)}>
                <MdEdit />
              </td>
              <td onClick={() => handleDelete(user)}>
                <RiDeleteBin5Fill />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Team Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='formModal'>
            <Form.Group controlId='formMemberName' className='formModal'>
              <Form.Label style={{fontSize:'2rem'}}>Name</Form.Label>
              <Form.Control
                type='text'
                name='member_name'
                value={formData.member_name}
                onChange={handleChange}
                style={{fontSize:'2rem'}}
              />
            </Form.Group>
            <Form.Group controlId='formDesignation' className='formModal'>
              <Form.Label style={{fontSize:'2rem'}}>Designation</Form.Label>
              <Form.Control
                type='text'
                name='designation'
                value={formData.designation}
                onChange={handleChange}
                style={{fontSize:'2rem'}}
              />
            </Form.Group>
            <Form.Group controlId='formPhoneNumber' className='formModal'>
              <Form.Label style={{fontSize:'2rem'}}>Phone Number</Form.Label>
              <Form.Control
                type='text'
                name='phonenumber'
                value={formData.phonenumber}
                onChange={handleChange}
                style={{fontSize:'2rem'}}
              />
            </Form.Group>
            <Form.Group controlId='formSalary' className='formModal'>
              <Form.Label style={{fontSize:'2rem'}}>Salary</Form.Label>
              <Form.Control
                type='number'
                name='salary'
                value={formData.salary}
                onChange={handleChange}
                style={{fontSize:'2rem'}}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setModalOpen(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllTeamMember;
