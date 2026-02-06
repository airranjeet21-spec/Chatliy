// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setReplyMessage } from "../redux/messageSlice";
// import { BsReplyFill } from "react-icons/bs";
// import { IoCloseOutline } from "react-icons/io5";
// import dp from "../assets/dp.webp";

// function ReceiverMessage({ image, message, replyTo }) {
//   const scrollRef = useRef(null);
//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector((state) => state.user);
//   const [showFullImage, setShowFullImage] = useState(false);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [message, image]);

//   const handleReply = () => {
//     dispatch(
//       setReplyMessage({
//         text: message,
//         img: image,
//         userName: selectedUser?.name || selectedUser?.userName,
//       }),
//     );
//   };

//   return (
//     <>
//       <div className="group flex items-start justify-start gap-[10px] relative mb-4">
//         <div className="w-[40px] h-[40px] min-w-[40px] overflow-hidden rounded-full shadow-md">
//           <img
//             src={selectedUser?.image || dp}
//             alt="receiver"
//             className="h-full w-full object-cover"
//           />
//         </div>

//         <div className="flex items-center gap-[10px]">
//           <div
//             ref={scrollRef}
//             className="w-fit max-w-[300px] sm:max-w-[500px] bg-[#20c7ff] p-2 px-3 text-white rounded-tl-none rounded-2xl shadow-md flex flex-col"
//           >
//             {replyTo && (replyTo.text || replyTo.img) && (
//               <div className="bg-black/10 border-l-4 border-white p-2 rounded-lg mb-2 text-xs flex justify-between items-center gap-2 min-w-[150px]">
//                 <div className="flex flex-col truncate">
//                   <p className="font-bold text-[#f8fafb] uppercase">
//                     {replyTo.userName}
//                   </p>
//                   <p className="text-white truncate">
//                     {replyTo.text || (replyTo.img ? "Photo" : "")}
//                   </p>
//                 </div>
//                 {replyTo.img && (
//                   <img
//                     src={replyTo.img}
//                     className="w-10 h-10 object-cover rounded-md border border-gray-200"
//                     alt="reply"
//                   />
//                 )}
//               </div>
//             )}

//             {image && (
//               <img
//                 src={image}
//                 className="w-full max-h-[250px] object-cover rounded-lg mb-1 cursor-pointer hover:brightness-95 transition-all shadow-sm"
//                 onClick={() => setShowFullImage(true)}
//                 alt="received"
//               />
//             )}
//             {message && (
//               <span className="text-[16px] sm:text-[17px] leading-tight px-1">
//                 {message}
//               </span>
//             )}
//           </div>

//           <button
//             onClick={handleReply}
//             className="opacity-0 group-hover:opacity-100 self-center p-2 bg-white rounded-full hover:bg-gray-100 transition-all text-gray-500 shadow-sm"
//           >
//             <BsReplyFill size={18} />
//           </button>
//         </div>
//       </div>
//       {showFullImage && (
//         <div
//           className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
//           onClick={() => setShowFullImage(false)}
//         >
//           <button className="absolute top-6 right-6 text-white text-4xl">
//             <IoCloseOutline />
//           </button>
//           <img
//             src={image}
//             className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in zoom-in duration-300"
//             onClick={(e) => e.stopPropagation()}
//             alt="full"
//           />
//         </div>
//       )}
//     </>
//   );
// }
// export default ReceiverMessage;
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReplyMessage } from "../redux/messageSlice";
import { BsReplyFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import dp from "../assets/dp.webp";

function ReceiverMessage({ image, message, replyTo }) {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleReply = () => {
    dispatch(
      setReplyMessage({
        text: message,
        img: image,
        userName: selectedUser?.name || selectedUser?.userName,
      }),
    );
  };

  return (
    <>
      <div className="group flex items-start justify-start gap-[10px] relative mb-4 px-2">
        {/* Receiver DP */}
        <div className="w-[35px] h-[35px] min-w-[35px] overflow-hidden rounded-full shadow-md">
          <img
            src={selectedUser?.image || dp}
            alt="receiver"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex items-center gap-[10px]">
          {/* Message Bubble - Receiver ka background white/grayish rakha hai */}
          <div
            ref={scrollRef}
            className="w-fit max-w-[75%] sm:max-w-[60%] bg-white p-3 text-gray-800 rounded-tl-none rounded-2xl shadow-md flex flex-col h-auto border border-gray-100"
          >
            {/* Reply Section */}
            {replyTo && (replyTo.text || replyTo.img) && (
              <div className="bg-gray-50 border-l-4 border-[#20c7ff] p-2 rounded-lg mb-2 text-xs flex justify-between items-center gap-2 min-w-[120px]">
                <div className="flex flex-col truncate">
                  <p className="font-bold text-[#20c7ff] uppercase">{replyTo.userName}</p>
                  <p className="text-gray-500 truncate">{replyTo.text || (replyTo.img ? "Photo" : "")}</p>
                </div>
                {replyTo.img && (
                  <img src={replyTo.img} className="w-8 h-8 object-cover rounded-md" alt="reply" />
                )}
              </div>
            )}

            {/* Image Content */}
            {image && (
              <img
                src={image}
                className="w-full max-h-[300px] object-cover rounded-lg mb-1 cursor-pointer hover:brightness-95 transition-all shadow-sm"
                onClick={() => setShowFullImage(true)}
                alt="received"
              />
            )}

            {/* Text Content - Auto Expand & Break Words */}
            {message && (
              <span className="text-[15px] sm:text-[16px] leading-relaxed break-words whitespace-pre-wrap px-1">
                {message}
              </span>
            )}
          </div>

          {/* Reply Button (Hover par dikhega) */}
          <button
            onClick={handleReply}
            className="opacity-0 group-hover:opacity-100 self-center p-2 bg-white rounded-full hover:bg-gray-100 transition-all text-gray-500 shadow-sm"
          >
            <BsReplyFill size={18} />
          </button>
        </div>
      </div>

      {/* Full Image Modal */}
      {showFullImage && (
        <div
          className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <button className="absolute top-6 right-6 text-white text-4xl">
            <IoCloseOutline />
          </button>
          <img
            src={image}
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
            alt="full"
          />
        </div>
      )}
    </>
  );
}

export default ReceiverMessage;