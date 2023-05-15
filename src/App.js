import React, { useEffect, useState,useContext } from "react";
import "./App.css";

// import { useDispatch, useSelector } from "react-redux";

import Routers from './components/Routers'
import {AuthContext} from './components/AuthProvider'
import { fetchUserData,reAuth } from "./redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";

function App() {

  const data = useContext(AuthContext)
  console.log(data)
  // const state = useSelector((state) => state.user);

  // const dispatch = useDispatch();

  const tokenverify = async () => {};

  
  return (
    <div className="App">
     <Routers/>
    </div>
  );
}

export default App;
