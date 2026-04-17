import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const savedState = localStorage.getItem("hotel");
    return savedState ? { hotel: JSON.parse(savedState) } : { hotel: null };
  } catch (err) {
    return { hotel: null };
  }
};

const initialState = loadState();

export const hotelDetailSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    hotelDetails: (state, action) => {
      state.hotel = {
        ...action.payload,
        loginTime: new Date().toISOString(),
      };
      localStorage.setItem("hotel", JSON.stringify(state.hotel));
    },
  },
});

export const { hotelDetails } = hotelDetailSlice.actions;
export default hotelDetailSlice.reducer;
