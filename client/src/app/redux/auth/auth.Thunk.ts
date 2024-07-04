import { AddUserDto } from "@/app/types/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUserApi } from "./auth.Api";

export const  addUser = createAsyncThunk(
  "user/add-user",
  async (user: AddUserDto, { rejectWithValue }) => {
    try {
      const response = await addUserApi(user);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
