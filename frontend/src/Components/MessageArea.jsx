import { IoIosArrowRoundBack } from "react-icons/io";
import { useEffect, useRef, useState, useCallback } from "react";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setselectedUser } from "../redux/userSlice";
import { RiEmojiStickerFill, RiSendPlaneFill } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { serverUrl } from "../config";
import { addMessage, setReplyMessage } from "../redux/messageSlice";
import { getSocket } from "../socket";
import useGetMessages from "../customHooks/getMessages";

function MessageArea() {
  const dispatch = useDispatch();
  useGetMessages();

  const { selectedUser, userData } = useSelector((state) => state.user);
  const { messages, replyMessage } = useSelector((state) => state.message);

  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const imageRef = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(addMessage(newMessage));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [dispatch, selectedUser?._id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (frontendImage) URL.revokeObjectURL(frontendImage);

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (loading || (!input.trim() && !backendImage)) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("message", input || "");
    if (backendImage) formData.append("image", backendImage);
    if (replyMessage) {
      formData.append("replyTo", JSON.stringify(replyMessage));
    }

    try {
      const res = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      setInput("");
      setBackendImage(null);
      setFrontendImage(null);
      setShowPicker(false);
      dispatch(setReplyMessage(null));
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Message send nahi ho paaya");
    } finally {
      setLoading(false);
    }
  };

  const onEmojiClick = (emoji) => {
    setInput((prev) => prev + emoji.emoji);
  };

  return (
    <div className="relative w-full h-full bg-slate-200 border-l-2 border-gray-300 lg:w-[70%] flex">
      {selectedUser ? (
        <div className="w-full h-screen flex flex-col">
          <div className="h-[80px] bg-[#20c7ff] flex items-center px-4 gap-4 shadow-lg z-10">
            <IoIosArrowRoundBack
              className="w-10 h-10 text-white cursor-pointer hover:scale-110 transition"
              onClick={() => dispatch(setselectedUser(null))}
            />
            <img
              src={selectedUser.image || dp}
              className="w-12 h-12 rounded-full bg-white object-cover shadow-sm"
              alt="user"
            />
            <h1 className="text-white font-semibold text-lg">{selectedUser.name}</h1>
          </div>

          {/* Messages List */}
          <div className="relative flex-1 overflow-y-auto px-4 py-6 space-y-4 no-scrollbar bg-slate-50">
            {messages && messages.map((mess) => {
              const senderId = mess.sender?._id || mess.sender;
              const isSender = String(senderId) === String(userData._id);

              return isSender ? (
                <SenderMessage key={mess._id} image={mess.image} message={mess.message} replyTo={mess.replyTo} />
              ) : (
                <ReceiverMessage key={mess._id} image={mess.image} message={mess.message} replyTo={mess.replyTo} />
              );
            })}
            <div ref={scrollRef} />
          </div>
          {frontendImage && (
            <div className="absolute bottom-[90px] left-4 p-2 bg-white rounded-lg shadow-2xl border-2 border-[#20c7ff] z-50">
              <img src={frontendImage} alt="preview" className="w-40 h-40 object-cover rounded-md" />
              <IoCloseCircle
                className="absolute -top-3 -right-3 text-red-500 text-3xl cursor-pointer bg-white rounded-full"
                onClick={() => { setFrontendImage(null); setBackendImage(null); }}
              />
            </div>
          )}

          {/* Reply Box */}
          {replyMessage && (
            <div className="mx-4 bg-white p-2 rounded-t-lg border-l-4 border-[#20c7ff] flex justify-between items-center shadow-md">
               <div className="text-xs text-gray-500 truncate">Replying to {replyMessage.userName}</div>
               <RxCross2 className="cursor-pointer" onClick={() => dispatch(setReplyMessage(null))} />
            </div>
          )}
          <form onSubmit={handleSendMessage} className="h-[80px] bg-[#20c7ff] flex items-center px-4 gap-3">
            <RiEmojiStickerFill className="text-white w-8 h-8 cursor-pointer" onClick={() => setShowPicker(!showPicker)} />
            
            {showPicker && (
              <div className="absolute bottom-24 left-4 z-50">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}

            <input type="file" hidden ref={imageRef} accept="image/*" onChange={handleImage} />
            
            <div className="flex-1 relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={loading ? "Uploading image..." : "Type a message..."}
                disabled={loading}
                className="w-full p-3 rounded-full outline-none bg-white text-gray-800 pr-12"
              />
              <FaImages
                className="absolute right-4 top-3 text-[#20c7ff] w-6 h-6 cursor-pointer"
                onClick={() => imageRef.current.click()}
              />
            </div>

            <button type="submit" disabled={loading} className="bg-white p-3 rounded-full shadow-lg disabled:bg-gray-300">
              <RiSendPlaneFill className="text-[#20c7ff] w-6 h-6" />
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-[#20c7ff] font-black text-6xl">Chatly!</h1>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
