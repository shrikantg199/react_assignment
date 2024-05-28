import { configureStore } from "@reduxjs/toolkit";
import VideoReducer from "./VideoSlice";
export const store = configureStore({
  reducer: {
    videoLibrary: VideoReducer,
  },
});
