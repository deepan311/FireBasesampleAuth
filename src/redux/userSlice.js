import { async } from "@firebase/util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, createUserDoc, firestore } from "../firebase/config";

const initial = {
  loading: false,
  auth: false,
  userData: null,
  error: null,
  uid:null
};

export const signUp = createAsyncThunk("user/signup", async (data) => {
  try {
    const { name, email, password } = data;


    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCreadential) => {
        const user = userCreadential.user;
        createUserDoc(user, { name })
          .then((res) => {
            sendEmailVerification(user)
              .then(() => {
                console.log("email send successfully");
                return res;
              })
              .catch((err) => {
                throw new Error(err);
              });
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    throw new Error(error);
  }
});

const fetchData = async (userId) => {
  
  const useRef = doc(firestore, "samData", userId);
  const snapshot = await getDoc(useRef);
  const data=snapshot.data();
  return {...data,creatAt:data.creatAt.toString()}
};

export const login = createAsyncThunk("user/login", async (data) => {
  const {email,password} = data
 
  try {
  return await signInWithEmailAndPassword(auth, email, password)
    .then(async (userCreadential) => {
      const user = userCreadential.user
      
      return user.uid
    })
    .catch((err) => {
      throw new Error(err);
    });

 
  } catch (error) {
    throw new Error(error);
  }
});


export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (uid) => {
    try {
      if(uid){
      const data= await fetchData(uid);
      console.log(data)
      return {...data}
      }else{
        throw new Error('User Not found...')
      }
       
    } catch (error) {
    throw new Error(error);

    }
  }
);

export const fetchImage = createAsyncThunk(
  "user/fetchImage",
  async (token) => {}
);

const userSlice = createSlice({
  name: "user",
  initialState: initial,
  reducers: {
    logout: (state) => {
      signOut(auth)
      state.auth = false;
      state.userData = null;
      state.error = null;
    },
    reAuth:(state,action)=>{
      state.auth=true;
      state.uid=action.payload
    }
  },
  extraReducers: (builder) => {
    // ====================SIGNUP========================

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.auth = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // ====================LOGIN========================

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = true;
      state.uid = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // ==================FETCHUSERData========================

    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.auth= true
      state.userData = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.auth = false;
      state.error = action.error.message;
    });

    // ==================FETCHUSERByToken========================

    builder.addCase(fetchImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchImage.fulfilled, (state, action) => {
      state.loading = false;
      state.profilesrc = action.payload;
    });
    builder.addCase(fetchImage.rejected, (state, action) => {
      state.loading = false;
      state.auth = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const { logout,reAuth } = userSlice.actions;
