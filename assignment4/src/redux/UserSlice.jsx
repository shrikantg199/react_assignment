import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    searchHistory: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addSearchTerm: (state, action) => {
      state.searchHistory = [...state.searchHistory, action.payload];
    },
  },
});

export const { addSearchTerm, setUsers } = userSlice.actions;
export default userSlice.reducer;
