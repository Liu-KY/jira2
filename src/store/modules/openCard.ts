import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface OpenCardState {
  projectModalOpen: boolean;
}

export const initialState: OpenCardState = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "openCard",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectModalOpen = (state: RootState) =>
  state.openCard.projectModalOpen;

export const { openProjectModal, closeProjectModal } = projectListSlice.actions;

export default projectListSlice.reducer;
