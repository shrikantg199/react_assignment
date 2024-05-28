import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkVideo } from "../redux/VideoSlice";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
const VideoList = () => {
  const { videos, showBookmarkedOnly } = useSelector(
    (state) => state.videoLibrary
  );
  const dispatch = useDispatch();
  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos
          .filter((video) => (showBookmarkedOnly ? video.bookmarked : true))
          .map((video) => (
            <li key={video.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <span className="font-bold block mb-2">
                  Title: {video.title}
                </span>
                <button
                  onClick={() => dispatch(bookmarkVideo(video.id))}
                  className={`px-4 py-2 rounded-md hover:opacity-75 transition-opacity duration-300 `}
                >
                  {video.bookmarked ? (
                    <FaBookmark className="text-blue-500" />
                  ) : (
                    <FaRegBookmark className="text-gray-500 hover:text-blue-500" />
                  )}
                </button>
              </div>

              <ReactPlayer
                url={video.file}
                controls={true}
                width="100%"
                height="200px"
                className="mb-2"
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default VideoList;
