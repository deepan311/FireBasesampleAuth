import React, { useEffect,useState ,useContext} from "react";

import { Navigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";


import { Route } from "react-router-dom";
import {AuthContext} from './AuthProvider'


const LoginProtected = ({ children }) => {

console.log('LoginProtected')
const {currentUser,loading,userData} = useContext(AuthContext)

if (loading ) {
    return (
      <div className="flex justify-center w-full">
        <BiLoaderAlt className="text-xl animate-spin" />
      </div>
    );
  }


  if(!currentUser ){
   return children
  }
  if(currentUser){
   return <Navigate to='/' />
  }



  };

export default LoginProtected;
