import { createSlice } from "@reduxjs/toolkit";
import { addUser } from "./auth.Thunk";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      users: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addUser.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(addUser.rejected, (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default authSlice.reducer;
  