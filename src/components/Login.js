import React, { useState, useEffect ,useContext} from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { BiLoaderAlt } from "react-icons/bi";
import authImg from "../asset/auth.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Formik, Form, Field } from "formik";
// import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userSlice";
import { useCookies } from "react-cookie";

import {AuthContext} from '../components/AuthProvider'

import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, createUserDoc } from "../firebase/config";

const Login = () => {
  const loc = useLocation();

  const [viewPass, setviewPass] = useState(true);
  const [pageLoad, setpageLoad] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();



 



  // const state = useSelector((state) => state.user);



  const {error,signIn} = useContext(AuthContext)
 

  const myStyle = {
    boxShadow: "0px 0px 9px 0px rgba(230,34,34,1)",
  };

  const initialValue = {
    email: (loc.state && loc.state.email) || "",
    password: "",
  };

  const validate = (e) => {
    const error = {};

    if (e.email.length < 1) {
      error.email = "Email Required";
    }

    if (e.password.length < 1) {
      error.password = "Password Required";
    }

    return error;
  };

  const log = async (e, { setFieldError }) => {
    const { email, password } = e;
    setpageLoad(true)
   const respone= await signIn(email,password)
   setpageLoad(false)
   console.log(respone)
   if(respone){
    navigate('/')
   }
   
    // setcookie('token',response.payload.token)
  };

  return (
    <>
      <Formik initialValues={initialValue} validate={validate} onSubmit={log}>
        {({ errors, handleBlur, touched, setFieldError }) => (
          <div className="grid grid-cols-1 h-full md:grid-cols-2 bg-gradient-to-b from-blue-400 to-slate-800 ">
            <div className="w-full h-screen mt-10">
              <div className="grid place-items-center">
                <img src={authImg} alt="" className="w-[60vh]" />
                <h3 className="text-white text-[10vh] font-semibold">
                  Auth App
                </h3>
              </div>
            </div>
            {/* ================================================================= */}

            <div className="bg-white rounded-[40px] md:rounded-b-[0px] -order-1 md:order-1">
              <div className="my-28 bg--300 w-5/6 md:w-4/6 mx-auto gird place-items-center">
                <h3 className="text-2xl font-semibold text-left mb-2">
                  Welcome Back
                </h3>

                <Form>
                  <div className="my-4">
                    <Field
                      name="email"
                      disabled={pageLoad ? true : false}
                      className=" w-full py-2 bg-gray-200 rounded px-3 outline-none"
                      placeholder="Email"
                      type="text"
                      onBlur={handleBlur}
                    />
                    <h2 className="text-red-700 text-left text-xs my-2">
                      {errors.email && touched.email && errors.email}
                    </h2>
                  </div>

                  <div className="relative my-4">
                    <Field
                      name="password"
                      disabled={pageLoad ? true : false}
                      className=" w-full  py-2 bg-gray-200 rounded px-3 outline-none relative"
                      placeholder="Confom Password"
                      type={viewPass ? "password" : "text"}
                      onBlur={handleBlur}
                    />
                    <h2 className="text-red-700 text-left text-xs my-2">
                      {errors.password && touched.password && errors.password}
                    </h2>

                    {viewPass ? (
                      <AiFillEyeInvisible
                        onClick={() => setviewPass(!viewPass)}
                        className="absolute top-3 text-xl right-3 "
                      />
                    ) : (
                      <AiFillEye
                        onClick={() => setviewPass(!viewPass)}
                        className="absolute top-3 text-xl right-3 "
                      />
                    )}

                    <div className="text-right">
                      <Link
                        to="/forgot-password"
                        className="text-blue-900 text-xs cursor-pointer hover:underline"
                      >
                        Forgot Passowrd
                      </Link>
                    </div>
                  </div>

                 
                   {pageLoad && ( <div className="flex justify-center w-full">
                      <BiLoaderAlt className="text-2xl animate-spin" />
                    </div>)}
                  

                 
                    {error && (<h2 className="text-red-700 text-center text-xl my-2">
                      {error}
                    </h2>)}
                 

                  <button
                  disabled={pageLoad ? true : false}
                    type="submit"
                    className=" my-4  font-semibold bg-gradient-to-r from-blue-400 to-slate-500 w-full  h-11 text-white rounded-full "
                  >
                    Login
                  </button>

                  <h3 className="font-semibold">or</h3>

                  <div className="grid lg:grid-cols-2 place-items-center">
                    <div className=" cursor-pointer hover:bg-black/20 hover:border-0 h-11 flex items-center my-2 border border-black rounded-full lg:w-auto w-full justify-center lg:justify-evenly px-4 py-2">
                      <FcGoogle className="ml-2" />
                      <span className="text-xs font-semibold mx-3">
                        SignIn Google
                      </span>
                    </div>
                    <button
                      type="button"
                      className=" cursor-pointer hover:bg-black/20 hover:border-0 h-11 flex items-center my-2 border border-black rounded-full lg:w-auto w-full justify-center lg:justify-evenly px-4 py-2"
                    >
                      <BsFacebook className="ml-2" />
                      <span className="text-xs font-semibold mx-3">
                        SignIn facebook
                      </span>
                    </button>
                  </div>
                  <div className="grid grid-cols-5 items-center my-4">
                    <hr className=" col-span-1 bg-gray-600 " />
                    <h3 className="col-span-3 text-xs">
                      Don't have a account{" "}
                      <span
                        onClick={() => {
                          navigate("/signup");
                        }}
                        className="cursor-pointer text-blue-300 underline"
                      >
                        click to SignUp
                      </span>
                    </h3>
                    <hr className="col-span-1   bg-black" />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
