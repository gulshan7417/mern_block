import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart:(state)=>{
      state.loading=true;
    },
    updateUserSuccess:(state,action)=>{
      state.currentUser=action.payload;
      state.loading=false;
      state.error=null
    },
    updateUserFailure:(state,action)=>{
      state.error=action.payload;
      state.loading=false
    },
    deleteUserStart:(state)=>{
      state.loading=true;
      state.error=null

    },
    deleteUserSuccess:(state)=>{
      state.currentUser=null;
      state.loading=false;
      state.error=null

    },
    deleteUserFailure:(state,action)=>{
      state.loading=false;
      state.error=action.payload
    },
    signoutSuccess:(state)=>{
      state.currentUser=null;
      state.error=null;
      state.loading=false;
    }

   

  },
});
export const { signInFailure, signInStart, signInSuccess ,updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signoutSuccess} = userSlice.actions;
export default userSlice.reducer;
