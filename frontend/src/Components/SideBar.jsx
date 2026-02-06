import React, { useEffect, useState } from "react";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import {
  setotherUsers,
  setselectedUser,
  setUserData,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../config";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userData, otherUsers, selectedUser, onlineUsers } = useSelector(
    (state) => state.user,
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const [input, setInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setotherUsers([]));
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!input.trim() || !otherUsers) {
      setFilteredUsers([]);
      return;
    }

    const value = input.toLowerCase();
    const result = otherUsers.filter(
      (u) =>
        u.name?.toLowerCase().includes(value) ||
        u.userName?.toLowerCase().includes(value),
    );

    setFilteredUsers(result);
  }, [input, otherUsers]);

  const closeSearch = () => {
    setSearchOpen(false);
    setInput("");
    setFilteredUsers([]);
  };

  return (
    <div
      className={`lg:block ${!selectedUser ? "block" : "hidden"} lg:w-[30%] w-full h-screen flex flex-col bg-slate-200 relative overflow-hidden`}
    >
      <div
        className="w-[60px] h-[60px] bg-[#20c7ff] rounded-full flex justify-center items-center shadow-lg fixed bottom-[20px] left-[10px] cursor-pointer z-50"
        onClick={handleLogOut}
      >
        <BiLogOutCircle className="w-[25px] h-[25px]" />
      </div>
      {searchOpen && input && (
        <div
          className="
    /* Positioning: Small screen par right-2 (side) aur top par, Desktop par sidebar ke side mein */
    fixed 
    top-[180px] /* Search bar ke thoda niche */
    right-2 
    left-25 
    sm:left-auto 
    sm:right-4 
    lg:left-[31%] /* Sidebar width ke thoda aage */
    
    /* Box Styling: Responsiveness ke liye max-width */
    max-h-[300px] 
    w-auto 
    min-w-[200px] 
    sm:w-[280px] 
    bg-white/95 
    backdrop-blur-md
    shadow-2xl 
    z-[100] 
    rounded-2xl 
    border border-cyan-100 
    animate-in zoom-in duration-200"
        >
          <div className="p-3 border-b flex justify-between items-center bg-[#20c7ff] rounded-t-2xl">
            <h3 className="font-bold text-white text-xs sm:text-sm">
              Quick Search
            </h3>
            <RxCross2
              className="text-white text-lg cursor-pointer hover:scale-110"
              onClick={closeSearch}
            />
          </div>
          <div className="overflow-y-auto max-h-[250px] p-2">
            {filteredUsers.length === 0 ? (
              <p className="text-center text-gray-400 text-xs py-4">
                Not found
              </p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center gap-2 p-2 mb-1 rounded-lg hover:bg-cyan-50 cursor-pointer border-b border-gray-50 last:border-0"
                  onClick={() => {
                    dispatch(setselectedUser(user));
                    closeSearch();
                  }}
                >
                  <div className="relative">
                    <img
                      src={user.image || dp}
                      className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] rounded-full object-cover border"
                      alt="user"
                    />
                    {onlineUsers?.includes(user._id) && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
                    )}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold text-gray-800 text-xs sm:text-sm truncate">
                      {user.name || user.userName}
                    </span>
                    <span className="text-[9px] text-gray-400">Online</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="h-[300px] bg-[#20c7ff] rounded-b-[30%] px-[20px] flex flex-col justify-center">
        <h1 className="text-white font-bold text-[25px]">Chatly</h1>
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-gray-800 font-bold text-lg sm:text-[22px] truncate max-w-[70%]">
            Hi, {userData?.userName || "User"}
          </h1>
          <div
            className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] min-w-[45px] bg-white rounded-full overflow-hidden cursor-pointer shadow-md border-2 border-white"
            onClick={() => navigate("/profile")}
          >
            <img
              src={userData?.image || dp}
              className="w-full h-full object-cover"
              alt="profile"
            />
          </div>
        </div>
        <div className="mt-[20px] flex items-center gap-[12px] w-full">
          {!searchOpen ? (
            <div
              className="w-[60px] h-[60px] bg-white rounded-full flex justify-center items-center shadow cursor-pointer"
              onClick={() => setSearchOpen(true)}
            >
              <IoIosSearch className="w-[25px] h-[25px]" />
            </div>
          ) : (
            <div className="w-full h-[60px] bg-white rounded-full flex items-center px-[15px] gap-[10px] shadow">
              <IoIosSearch className="w-[25px] h-[25px]" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search..."
                className="w-full outline-none"
              />
              <RxCross2 className="cursor-pointer" onClick={closeSearch} />
            </div>
          )}
          {!searchOpen && (
            <div className="mt-[15px] flex gap-[12px] overflow-x-auto">
              {otherUsers?.map((user) => (
                <div
                  key={user._id}
                  className="flex flex-col items-center cursor-pointer min-w-[60px]"
                  onClick={() => dispatch(setselectedUser(user))}
                >
                  <div className="relative">
                    <img
                      src={user.image || dp}
                      className="w-[55px] h-[55px] rounded-full border-2 border-white"
                      alt="user"
                    />
                    {onlineUsers?.includes(user._id) && (
                      <span className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-green-400 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <span className="text-[12px] text-gray-700 truncate w-[60px] text-center">
                    {user.userName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="mt-[10px] overflow-y-auto "
        style={{ height: "calc(100vh - 320px) " }}
      >
        <div className="flex flex-col items-center gap-[15px] pb-[40px]">
          {otherUsers?.map((user) => (
            <div
              key={user._id}
              className="w-[95%] min-h-[60px] flex items-center gap-[10px] bg-white shadow rounded-full px-[10px] hover:bg-[#6be7eb] cursor-pointer "
              onClick={() => dispatch(setselectedUser(user))}
            >
              <div className="relative">
                <img
                  src={user.image || dp}
                  className="w-[50px] h-[50px] rounded-full"
                  alt="user"
                />
                {onlineUsers?.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-[12px] h-[12px] bg-green-400 rounded-full"></span>
                )}
              </div>
              <span className="font-semibold truncate">
                {user.name || user.userName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default SideBar;
