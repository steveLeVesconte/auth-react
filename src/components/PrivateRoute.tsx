import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
//import DashNavbar from './DashNavbar'

export default function PrivateRoutes() {
  const { currentUser } = useAuth()
  console.log('in private: ', currentUser);

if(currentUser){
    console.log('in private true: ', currentUser);


    return   (
        <>
         {/*  <DashNavbar /> */}
          <Outlet />
        </>)

}else{
    console.log('in private false: ', currentUser);
    return   (<Navigate to="/login" />);

}

/*   return currentUser ? (
    <>
       <DashNavbar />}
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  ) */
}


/* 

import React from 'react'
import { Route } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser}=useAuth();
  return (
    <Route
        {...rest}
        render={props=>{
           currentUser ? <Component {...props} />:<Redirect to="/login"></Redirect>
        }

        }
>
        
    </Route>
  )
}

export default PrivateRoute */