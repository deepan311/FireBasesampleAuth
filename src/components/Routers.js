import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import Home from "./Home";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { reAuth } from "../redux/userSlice";
import { Routes, Route, Link } from "react-router-dom";
import HomeProtected from "./HomeProtected";
import LoginProtected from "./LoginProtected";
import VerifyEmail from './VerifyEmail'

function Roters() {
  // const state = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // useEffect(() => {

  //     const unsub = onAuthStateChanged(auth,user=>{

  //       if(user&& !state.uid){
  //         console.log(user)
  //     // dispatch(fetchUserByUser(user))
  //         const uid = user.uid
  //         dispatch(reAuth(uid))

  //   }else{
  //     console.log('User Not Found')
  //   }
  //   })
  //   return ()=> unsub()

  // },[]);
  console.log("roter page");

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginProtected>
              <Login />
            </LoginProtected>
          }
        />

        <Route
          path="/signup"
          element={
            <LoginProtected>
              <SignUp />
            </LoginProtected>
          }
        />
        <Route
          exact
          path="/"
          element={
            <HomeProtected>
              <Home />
            </HomeProtected>
          }
        />
        <Route
          exact
          path="/verify-email"
          element={
            <VerifyEmail/>
          }
        />
      </Routes>
    </div>
  );
}

export default Roters;
