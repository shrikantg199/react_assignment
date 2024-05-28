import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVideo, toggleBookmarkFilter } from "../redux/VideoSlice";

import VideoList from "./VideoList";

const AddVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const { showBookmarkedOnly } = useSelector((state) => state.videoLibrary);
  const dispatch = useDispatch();

  const handleToggleBookmarkFilter = () => {
    dispatch(toggleBookmarkFilter());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoFile) {
      const video = {
        id: Date.now(),
        title: videoFile.name,
        file: URL.createObjectURL(videoFile),
        bookmarked: false,
      };
      dispatch(addVideo(video));
      setVideoFile(null);
      e.target.reset();
    }
  };

  return (
    <div className="container mx-auto px-4 m-4">
      {/* upload files */}
      <form onSubmit={handleSubmit} className="mb-4 mx-auto w-[80vh]">
        <div className="flex items-center">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="mr-2 border-gray-300 rounded-md"
          />
          <button
            type="submit"
            disabled={!videoFile}
            className="px-4 py-2 bg-blue-800 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Video
          </button>
        </div>
      </form>
      {/* bookmark */}
      <div className="mb-4  ">
        <label className="flex justify-center mt-4 items-center">
          <input
            type="checkbox"
            checked={showBookmarkedOnly}
            onChange={handleToggleBookmarkFilter}
            className="form-checkbox mr-2 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-700 font-medium">
            Show Bookmarked Only
          </span>
        </label>
      </div>
      {/* Video List */}
      <VideoList />
    </div>
  );
};

export default AddVideo;
