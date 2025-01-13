"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Textarea,
  Button,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { useSwipeable } from "react-swipeable";
import {
  FaArrowUp,
  FaArrowDown,
  FaPlay,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaExpand,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import useSession from "@/hooks/useSession";

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const { user } = useSession();
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/videos/upload", { cache: "no-store" });
      const data = await res.json();
      setVideos(data.videos);
    };

    fetchVideos();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const addComment = async (videoId) => {
    if (!comment) return;

    const commentData = {
      user: user?._id || "Anonymous",
      text: comment,
    };

    const res = await fetch(`/api/videos/${videoId}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const updatedVideos = videos.map((video) =>
        video._id === videoId
          ? { ...video, comments: [...video.comments, commentData] }
          : video
      );
      setVideos(updatedVideos);
      setComment("");
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: handleNext,
    onSwipedDown: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  const toggleLike = async (videoId) => {
    const res = await fetch(`/api/videos/${videoId}/likes`, {
      method: "POST",
      body: JSON.stringify({ user: user?._id }), // Pass user ID
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const updatedVideo = await res.json();
      const updatedVideos = videos.map((video) =>
        video._id === updatedVideo.videoId
          ? { ...video, likes: updatedVideo.likes }
          : video
      );
      setVideos(updatedVideos);
    }
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      const element = playerRef.current.wrapper;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  return (
    <div {...handlers} className="min-h-screen w-full ">
      <div className="container mx-auto px-2 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <AnimatePresence className="relative">
            {videos?.map((video, index) =>
              index === currentIndex ? (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-2xl overflow-hidden h-[88vh] w-full"
                >
                  <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
                    <button
                      onClick={() => toggleLike(videos[currentIndex]?._id)}
                      className="text-white bg-black bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200 flex items-center space-x-1"
                    >
                      {videos[currentIndex]?.likes?.includes(user?._id) ? (
                        <FaHeart className="text-red-500 text-2xl" />
                      ) : (
                        <FaRegHeart className="text-2xl" />
                      )}
                      <span className="text-sm">
                        {videos[currentIndex]?.likes?.length || 0}
                      </span>
                    </button>
                  </div>
                  <ReactPlayer
                    ref={playerRef}
                    url={video.videoUrl}
                    playing={isPlaying}
                    muted={isMuted}
                    loop
                    width="100%"
                    height="100%"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <div className="absolute inset-0 bg-transparent bg-opacity-30" />
                  {/* Play/Pause button */}
                  <button
                    onClick={togglePlay}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white bg-black bg-opacity-50 p-4 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
                  >
                    {isPlaying ? (
                      <FaPause className="text-3xl" />
                    ) : (
                      <FaPlay className="text-3xl" />
                    )}
                  </button>
                  {/* Mute button */}
                  <button
                    onClick={toggleMute}
                    className="absolute top-4 right-16 z-20 text-white bg-black bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
                  >
                    {isMuted ? (
                      <FaVolumeMute className="text-xl" />
                    ) : (
                      <FaVolumeUp className="text-xl" />
                    )}
                  </button>
                  {/* Fullscreen button */}
                  <button
                    onClick={handleFullscreen}
                    className="absolute top-4 right-4 z-20 text-white bg-black bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
                  >
                    <FaExpand className="text-xl" />
                  </button>
                  {/* Navigation buttons */}
                  <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 text-white bg-black bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
                  >
                    <FaArrowUp className="text-2xl" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 text-white bg-black bg-opacity-50 p-3 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-200"
                  >
                    <FaArrowDown className="text-2xl" />
                  </button>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          <Card className="bg-black bg-opacity-80 rounded-2xl">
            <CardBody className="p-4">
              <h4 className="text-white text-lg font-semibold mb-2">
                Comments
              </h4>
              <div className="h-[calc(100vh-300px)] max-sm:h-auto overflow-y-auto mb-4">
                <ul className="space-y-2">
                  {videos[currentIndex]?.comments?.map((c, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-white text-sm bg-white/25 rounded-xl p-2 w-fit"
                    >
                      {c.text}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg p-2"
              />
            </CardBody>
            <CardFooter className="justify-end p-2">
              <Button
                onClick={() => addComment(videos[currentIndex]?._id)}
                disabled={!comment}
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg"
              >
                Comment
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
