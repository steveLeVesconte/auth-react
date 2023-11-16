import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useContext } from 'react';
import {PlayerContext} from '../contexts/PlayerContext';
//import DashNavbar from './DashNavbar'

export default function PrivateRoutes() {
  const { currentUser } = useAuth();
  const player=useContext(PlayerContext);
  const loc=useLocation();
  console.log('in private: ', currentUser);
  if(!currentUser){

    console.log('in private false: ', currentUser);
    return   (<Navigate to="/login" />);

  }

if(player || loc.pathname=="/player-profile"){
    console.log('has player or is player profile route: ', currentUser);


    return   (
        <>
         {/*  <DashNavbar /> */}
          <Outlet />
        </>)

}else{
 
    console.log('in no profile: ', player, loc);

  //  if(loc.pathname!=="/player-profile"){
    return   (<Navigate to="/player-profile" />);
    }
    // else
    // {
    //   return (
    //     <>
    //      {/*  <DashNavbar /> */}
    //       <Outlet />
    //     </>)
    // }

//}

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