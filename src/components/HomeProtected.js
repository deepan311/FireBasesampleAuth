import { Route } from "react-router-dom";
import {AuthContext} from './AuthProvider'
import {useContext} from 'react'
import { Navigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

const HomeProtected = ({ children ,redirect}) => {




const {currentUser,loading,userData} = useContext(AuthContext)

console.log('home protected')
if (loading ) {
    return (
      <div className="flex justify-center w-full bg-black/10 h-screen items-center">
          <BiLoaderAlt className="text-2xl animate-spin text-black-500" />Loading...
        </div>
    );
  }

  


  if(currentUser){
   return children
  }
  if(!currentUser){
   return <Navigate to='./login'replace/>
  }

};

export default HomeProtected;
