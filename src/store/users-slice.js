import { createSlice } from '@reduxjs/toolkit';
const initialUserState = { users: [] };

const userSlice = createSlice({
  name: 'users',
  initialState: initialUserState,
  reducers: {
    removeUser() {},
    editUser() {},
  },
});
