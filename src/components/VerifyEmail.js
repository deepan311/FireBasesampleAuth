import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { getAuth, applyActionCode } from "firebase/auth";
import { auth, createUserDoc } from "../firebase/config";
import { useParams } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

function VerifyEmail() {
  const serach = new URLSearchParams(window.location.search);
  console.log(serach);

  const mode = serach.get("mode");
  const oobCode = serach.get("oobCode");
  console.log(mode)
  console.log(oobCode)
  const [load, setload] = useState(false);
  const [msg, setmsg] = useState("");
  useEffect(() => {
    // Verify the email with the oobCode
    if (mode === "verifyEmail" && oobCode) {
      setload(true);
      applyActionCode(auth, oobCode)
        .then(() => {
          // Update the user's email verification status in your database
          // For example, using the Firebase Firestore API:
          // const user = firebase.auth().currentUser;
          // firebase.firestore().collection("users").doc(user.uid).update({ emailVerified: true });

          console.log("Email verified successfully!");
          setload(false);
          setmsg("Email Verified successfully");
        })
        .catch((error) => {
          console.log("err", error);
          setload(false);
          setmsg("Invild Link try again");
        });
    } else {
      setmsg("Link Invalid");
    }
  }, []);

  return (
    <div>
      <div className="flex bg-gray-700 justify-center items-center h-screen w-full">
        {load ? (
          <BiLoaderAlt className="text-2xl text-white animate-spin" />
        ) : (
          <h3
            className="text-white"
          >
            {msg}
          </h3>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
