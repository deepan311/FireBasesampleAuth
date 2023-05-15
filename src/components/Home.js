import React, { useEffect, useState ,useContext} from "react";
import Profile from "../asset/profile.png";
import { MdAddAPhoto, MdVerified } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import {AuthContext} from './AuthProvider'


const Home = () => {
  console.log('home component')
  const [time, settime] = useState(120);
  const [timer, settimer] = useState(null);
  const [msg, setmsg] = useState({ data: null, status: false, color: null });
  const [pageload, setpageload] = useState(false);

  const {currentUser,fetchData,userData,logOut} = useContext(AuthContext)


  const navigate = useNavigate()
  
  // console.log(state)
  const submit = (e) => {
   
  };

  const resendverify = (email) => {
  
  };

 console.log('home')
 const setUser=async(user)=>{
  await fetchData(currentUser).then(res=>{
      
    }).catch(err=>{
      console.log('data Fetch Error')
    })
 }

  useEffect(() => {
 // logOut()
   if(currentUser){
    setpageload(true)
    setUser(currentUser)
   setpageload(false)

   }

    if (time <= 1) {
      settimer(clearInterval(timer));
      settime(120);
    }
    // return ()=>unsub()
  }, [timer, time]);

  if (pageload || !userData) {
    return (
      <div className="flex justify-center w-full bg-black/10 h-screen items-center">
      <BiLoaderAlt className="text-2xl animate-spin text-black-500" />Fetching...
    </div>
    );
  }

  const timeformat = (sec) => {
    const minute = Math.floor(sec / 60);
    const seconds = sec % 60;

    const formin = minute.toString().padStart(2, "0");
    const forsec = seconds.toString().padStart(2, "0");
    return `${formin}: ${forsec}`;
  };

  if (msg.status) {
    setTimeout(() => {
      setmsg({ status: false, data: null, color: null });
    }, 11000);
  }

  const fileUpload = async (e) => {

  };

 

  return (
    <>
    {userData.email}
    <br />
    <button onClick={()=>{
      logOut()
      navigate('/login')
    }}>Signout</button>
    </>
    // <div className="w-full flex-col justify-center  h-screen bg-orange-50 py-14 relative">
    //   {msg.status && (
    //     <div className="absolute top-0 w-full bg-gray-700 text-center ">
    //       <h3 className={`${msg.status && msg.color} text-xs font-bold py-3`}>
    //         {msg.data}
    //       </h3>
    //     </div>
    //   )}

    //   {interload && (
    //     <div className="absolute bg-black/50 z-10 h-full top-0 flex justify-center items-center w-full">
    //       <BiLoaderAlt className="text-3xl text-white animate-spin " />
    //       <h2 className="text-white">Loading</h2>
    //     </div>
    //   )}

    //   <h5 className="text-2xl font-bold my-5">
    //     Welcome 
    //   </h5>

    //   <form action="" onSubmit={submit}>
    //     <div className=" w-36 h-36 m-auto rounded-full relative overflow-hidden group">
    //       <img
    //         src={state.profilesrc}
    //         alt=""
    //         className="w-full h-full object-cover"
    //       />
    //       <div
    //         onChange={fileUpload}
    //         onClick={() => {
    //           document.querySelector("#fromId").click();
    //         }}
    //         type="file"
    //         className="absolute bottom-0 bg-black/50 w-full left-0 py-3 cursor-pointer    hidden group-hover:block  h-14"
    //       >
    //         <input
    //           name="file"
    //           type="file"
    //           hidden
    //           id="fromId"
    //           className="absolute w-full h-full bg-gray-500 left-0"
    //         />
    //         <MdAddAPhoto className="w-full text-white text-xl" />
    //       </div>
    //     </div>
    //     {err && <h1>{err}</h1>}

    //     <h3 className="font-bold font-mono text-xl my-2">{state.fullname}</h3>
    //     <div className="flex items-center place-content-center">
    //       <h3 className="text-md font-mono">{state.userdata.email}</h3>{" "}
    //       {state.userdata.emailVerified ? (
    //         <MdVerified className="text-green-500 mx-3" />
    //       ) : (
    //         <>
    //           <ImCancelCircle className="text-red-500 mx-3" />{" "}
    //           <h3 className="text-xs font-bold text-black mx-2">
    //             Check your Inbox
    //           </h3>
    //           <br />
    //           {reload ? (
    //             <BiLoaderAlt className="text-xl animate-spin" />
    //           ) : (
    //             <button
    //               disabled={timer != null}
    //               className={`${
    //                 timer === null || timer === undefined
    //                   ? "text-blue-800"
    //                   : "text-gray-500"
    //               } text-xs `}
    //               type="button"
    //               onClick={() => {
    //                 resendverify(state.userdata.email);
    //               }}
    //             >
    //               Resend Email
    //             </button>
    //           )}
    //           <h2 className="text-xs text-black mx-4">
    //             {timer != null && timeformat(time)}
    //           </h2>
    //         </>
    //       )}
    //     </div>
    //     <button
    //       type="submit"
    //       className="px-7 text-white my-4 py-2 text-xl bg-gradient-to-tr from-blue-400 to-slate-700  rounded"
    //     >
    //       Signout
    //     </button>
    //   </form>
    // </div>
  );
};

export default Home;
