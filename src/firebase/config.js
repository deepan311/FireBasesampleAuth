import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";

import { useDispatch } from "react-redux";
import { fetchUserByUser } from "../redux/userSlice";

const firebaseConfig = {
  apiKey: "AIzaSyAyPNKYExh7nqU6C1MUdjWZK-3ncs4eCMw",
  authDomain: "sample-30757.firebaseapp.com",
  projectId: "sample-30757",
  storageBucket: "sample-30757.appspot.com",
  messagingSenderId: "1088618011377",
  appId: "1:1088618011377:web:fab9aa64635fbee072e750",
  measurementId: "G-65BR33XL19",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const firestore = getFirestore(app);

export const createUserDoc = async (user, addData) => {
  const userId = user.uid;

  const useRef = doc(firestore, "samData", userId);

  const snapshot = await getDoc(useRef);

  if (!snapshot.exists()) {
    const { email } = user;

    const info = await setDoc(useRef, {
      ...addData,
      email,
      createAt: serverTimestamp(),
    });
    // console.log(first)
    return true;
  } else {
    return false;
  }
};

export const deleteUserAndData = async (user) => {
  try {
    await deleteUser(user).then(async (uid) => {
      const useRef = doc(firestore, "samData", uid);
      const snapshot = await getDoc(useRef);
      console.log("snapshot on deleteUser", snapshot);
      if (snapshot.exists()) {
        return await deleteDoc(useRef).then((res) => {
          console.log("deleteData");
          return 
        });
      } else {
        console.log("no Data Found This user");
      }
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

// export const checkUser = async () => {
//   return await onAuthStateChanged(auth, (user) => {
//     if (user) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// };
