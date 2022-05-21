
import Moralis from "moralis";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getNFTOwners} from "../../utils/hooks/getNfts";
import {write} from "fs";
interface url {
    address: string,
    token_id: string
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
    async(_, thunkAPI) => {
      try {
          return await Moralis.authenticate().then((user) => {
              console.log(user);
              return {name: user.getUsername(), token: user.getSessionToken(), wallet: user.get('accounts')[0]}
          });
      } catch (e) {
          thunkAPI.rejectWithValue('Ошибка входа');
      }
    }
);

export const fetchOwners = createAsyncThunk(
    'owners/fetchOwners',
    async({address, token_id}: url, thunkAPI) => {
        try {

            return getNFTOwners(address, token_id, 'eth').then(r => {
                return r.data.result;
            });
        } catch (e) {
            thunkAPI.rejectWithValue('Владельцев не существует');
        }
    }
)