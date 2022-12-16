import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expandSidebar: true,
};

export const ExpandSlice = createSlice({
  name: "expandSidebar",
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.expandSidebar = !state.expandSidebar;
    },
  },
});

export const { toggleSidebar } = ExpandSlice.actions;

export default ExpandSlice.reducer;
