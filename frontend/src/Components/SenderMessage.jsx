// import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import dp from "../assets/dp.webp";
// import { BsReplyFill } from "react-icons/bs";
// import { IoCloseOutline } from "react-icons/io5"; 
// import { setReplyMessage } from "../redux/messageSlice";

// function SenderMessage({ image, message, replyTo }) {
//   const scrollRef = useRef(null);
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user || {});
//   const [showFullImage, setShowFullImage] = useState(false);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message, image]);

//   const handleReplyClick = () => {
//     dispatch(setReplyMessage({
//       text: message,
//       img: image,
//       userName: "You"
//     }));
//   };

//   return (
//     <>
//       <div className="group flex items-start justify-end gap-[10px] relative mb-4">
//         <button 
//           onClick={handleReplyClick}
//           className="opacity-0 group-hover:opacity-100 self-center p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all text-gray-500 shadow-sm"
//         >
//           <BsReplyFill size={18} />
//         </button>

//         <div 
//           ref={scrollRef}
//           className="w-fit max-w-[300px] sm:max-w-[500px] bg-[#20c7ff] p-2 px-3 text-white rounded-tr-none rounded-2xl shadow-md flex flex-col"
//         >
//           {replyTo && (replyTo.text || replyTo.img) && (
//             <div className="bg-black/10 border-l-4 border-white p-2 rounded-lg mb-2 text-xs flex justify-between items-center gap-2 min-w-[150px]">
//               <div className="flex flex-col truncate">
//                 <p className="font-bold text-white/80 uppercase">{replyTo.userName}</p>
//                 <p className="text-white/90 truncate">{replyTo.text || (replyTo.img ? "Photo" : "")}</p>
//               </div>
//               {replyTo.img && (
//                 <img src={replyTo.img} className="w-10 h-10 object-cover rounded-md opacity-80" alt="reply" />
//               )}
//             </div>
//           )}

//           {image && (
//             <img 
//               src={image} 
//               className="w-full max-h-[250px] object-cover rounded-lg mb-1 cursor-pointer hover:brightness-90 transition-all shadow-sm" 
//               onClick={() => setShowFullImage(true)} 
//               alt="sent"
//             />
//           )}
//           {message && <span className="text-[16px] sm:text-[17px] leading-tight px-1">{message}</span>}
//         </div>

//         <div className="w-[40px] h-[40px] min-w-[40px] overflow-hidden rounded-full shadow-md">
//           <img src={userData?.image || dp} alt="user" className="h-full w-full object-cover" />
//         </div>
//       </div>
//       {showFullImage && (
//         <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowFullImage(false)}>
//           <button className="absolute top-6 right-6 text-white text-4xl"><IoCloseOutline /></button>
//           <img src={image} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in zoom-in duration-300" onClick={(e) => e.stopPropagation()} alt="full" />
//         </div>
//       )}
//     </>
//   );
// }
// export default SenderMessage;
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import dp from "../assets/dp.webp";
import { BsReplyFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5"; 
import { setReplyMessage } from "../redux/messageSlice";

function SenderMessage({ image, message, replyTo }) {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user || {});
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleReplyClick = () => {
    dispatch(setReplyMessage({
      text: message,
      img: image,
      userName: "You"
    }));
  };

  return (
    <>
      <div className="group flex items-start justify-end gap-[10px] relative mb-4 px-2 w-full">
        <button onClick={handleReplyClick} className="opacity-0 group-hover:opacity-100 self-center p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all text-gray-500 shadow-sm">
          <BsReplyFill size={18} />
        </button>

        {/* Logic: Image ho to fix width, nahi to text ke liye max-width lock */}
        <div 
          ref={scrollRef}
          className={`${image ? "w-[280px] sm:w-[350px]" : "w-fit max-w-[250px] sm:max-w-[400px]"} bg-[#20c7ff] p-3 text-white rounded-tr-none rounded-2xl shadow-md flex flex-col h-auto`}
        >
          {replyTo && (replyTo.text || replyTo.img) && (
            <div className="bg-black/10 border-l-4 border-white p-2 rounded-lg mb-2 text-xs flex justify-between items-center gap-2 min-w-[120px]">
              <div className="flex flex-col truncate">
                <p className="font-bold text-white/80 uppercase">{replyTo.userName}</p>
                <p className="text-white/90 truncate">{replyTo.text || (replyTo.img ? "Photo" : "")}</p>
              </div>
              {replyTo.img && <img src={replyTo.img} className="w-8 h-8 object-cover rounded-md opacity-80" alt="reply" />}
            </div>
          )}

          {image && (
            <img 
              src={image} 
              className="w-full max-h-[300px] object-cover rounded-lg mb-2 cursor-pointer hover:brightness-90 transition-all shadow-sm" 
              onClick={() => setShowFullImage(true)} 
              alt="sent"
            />
          )}

          {message && (
            <span className="text-[15px] sm:text-[16px] leading-relaxed break-all whitespace-pre-wrap px-1">
              {message}
            </span>
          )}
        </div>

        <div className="w-[35px] h-[35px] min-w-[35px] overflow-hidden rounded-full shadow-md">
          <img src={userData?.image || dp} alt="user" className="h-full w-full object-cover" />
        </div>
      </div>

      {showFullImage && (
        <div className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowFullImage(false)}>
          <button className="absolute top-6 right-6 text-white text-4xl"><IoCloseOutline /></button>
          <img src={image} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} alt="full" />
        </div>
      )}
    </>
  );
}

export default SenderMessage;