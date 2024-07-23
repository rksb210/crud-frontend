import { useState } from 'react'
import Registration from './components/registration_login/Registration'
import { createBrowserRouter } from "react-router-dom";
import Login from './components/registration_login/Login';
import ViewUser from './pages/ViewUser';
import EditUser from './pages/EditUser';
import AllTeamMember from './components/AllTeamMember';
import AddTeam from './pages/AddTeam';
import Home from './pages/Home';
import Dropdown from './pages/dropdown/Dropdown';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/registration",
    element: <Registration />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/getuser",
    element: <ViewUser />
  },
  {
    path: "/edituser",
    element: <EditUser />
  },
  // {
  //   path: "/addteam",
  //   element: <AddTeam />
  // },
  {
    path: "/team/:id",
    element: <AllTeamMember />
  },
  {
    path: "/addteam/:id",
    element: <AddTeam/>
  },
  {
    path: "/dropdown",
    element: <Dropdown/>
  },
  
])

export default router
