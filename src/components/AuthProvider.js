import React, { useState, useEffect, createContext } from "react";
import {
  auth,
  firestore,
  createUserDoc,
  deleteUserAndData,
} from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  serverT,
} from "firebase/auth";
import { BiLoaderAlt } from "react-icons/bi";
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        await createUserDoc(res, { name: "deepannn" });
        return res;
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const fetchData = async (user) => {
    return new Promise(async (resolve, reject) => {
      const userId = user.uid;
      const useRef = await doc(firestore, "samData", userId);
      const snapshot = await getDoc(useRef);
      const data = await snapshot.data();
      console.log(data);
      if (data) {
        setUserData({ ...data, createAt: data.createAt.toString() });
        resolve({ ...data, createAt: data.createAt.toString() });
        console.log(userData);
      } else {
        setError("No fetch Data");
        reject("no fetch data");
      }
    });
  };

  const signUp = async (email, password, addData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(true);
      console.log(userCredential);
      await createUserDoc(userCredential.user, addData)
        .then(async (res) => {
          console.log("userdata create successfully");
          await sendEmailVerification(userCredential.user).then((send) => {
            console.log("VerifyLink Send successfully");
          });
        })
        .catch(async (err) => {
          await deleteUserAndData(userCredential.user);
        });
      setLoading(false);
    } catch (error) {
      setError(error.message || error);
      setLoading(false);
    }
  };

  const createUser = async (user, addData) => {
    return await createUserDoc(user, addData)
      .then(async () => {
        // await fetchData(user)
        return true;
      })
      .catch((err) => {
        setError("create user Error");
        return err;
      });
  };

  const logOut = async () => {
    setCurrentUser(null);
    setUserData(null);
    setError(null);
    return signOut(auth);
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    loading,
    fetchData,
    userData,
    logOut,
    error,
    createUser,
    setError,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="flex justify-center w-full bg-black/10 h-screen items-center">
          <BiLoaderAlt className="text-2xl animate-spin text-black-500" />Loading...
        </div>
      )}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
