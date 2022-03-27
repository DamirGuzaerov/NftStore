
import Moralis from "moralis";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
    async(_, thunkAPI) => {
      try {
          return await Moralis.authenticate().then((user) => {
              return {name: user.getUsername(), token: user.getSessionToken(), wallet: user.get('accounts')[0]}
          });
      } catch (e) {
          thunkAPI.rejectWithValue('Ошибка входа');
      }
    }
);