// videoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  bookmarkedVideos: [],
  showBookmarkedOnly: false,
};

const videoSlice = createSlice({
  name: 'videoLibrary',
  initialState,
  reducers: {
    addVideo: (state, action) => {
      state.videos.push(action.payload);
    },
    bookmarkVideo: (state, action) => {
      const videoId = action.payload;
      const video = state.videos.find((v) => v.id === videoId);
      if (video) {
        if (video.bookmarked) {
          video.bookmarked = false;
          state.bookmarkedVideos = state.bookmarkedVideos.filter((v) => v.id !== videoId);
        } else {
          video.bookmarked = true;
          state.bookmarkedVideos.push(video);
        }
      }
    },
    toggleBookmarkFilter: (state) => {
      state.showBookmarkedOnly = !state.showBookmarkedOnly;
    },
  },
});

export const { addVideo, bookmarkVideo, toggleBookmarkFilter } = videoSlice.actions;
export default videoSlice.reducer;