import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  searchResults: [],
};

const searchFoodSlice = createSlice({
  name: "searchFood",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchTerm, setSearchResults } = searchFoodSlice.actions;
export default searchFoodSlice.reducer;
