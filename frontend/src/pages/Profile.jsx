
import React, { useRef, useState } from "react";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(userData?.name || "");
  const [frontendImage, setFrontendImage] = useState(
    userData?.image || dp
  );
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const imageRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(result.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 transition"
        >
          <IoIosArrowRoundBack className="w-10 h-10" />
        </button>
        <div className="h-[160px] bg-[#20c7ff] rounded-b-[35%] flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white tracking-wide top-1">
            Profile 
          </h1>
        </div>
        <div className="flex justify-center -mt-12">
          <div
            className="relative w-[160px] h-[160px] rounded-full border-4 border-[#20c7ff]
              bg-white shadow-xl overflow-hidden cursor-pointer"
            onClick={() => imageRef.current.click()}
          >
            <img
              src={frontendImage}
              alt="profile"
              className="w-full h-full object-cover"
            />

            <div
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full 
              bg-[#20c7ff] flex items-center justify-center shadow-md"
            >
              <IoCameraOutline className="text-white w-5 h-5" />
            </div>
          </div>
        </div>
        <form
          onSubmit={handleProfile}
          className="px-6 py-8 flex flex-col items-center gap-5"
        >
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imageRef}
            onChange={handleImage}
          />

          <input
            type="text"
            placeholder="Your name"
            className="w-full h-[50px] px-5 text-lg text-gray-700
              border-2 border-[#20c7ff] rounded-xl
              outline-none focus:ring-2 focus:ring-[#20c7ff]
              shadow-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            readOnly
            value={userData?.userName}
            className="w-full h-[50px] px-5 text-lg text-gray-500
              border-2 border-gray-300 rounded-xl bg-gray-100
              cursor-not-allowed"
          />

          <input
            type="email"
            readOnly
            value={userData?.email}
            className="w-full h-[50px] px-5 text-lg text-gray-500
              border-2 border-gray-300 rounded-xl bg-gray-100
              cursor-not-allowed"
          />

          <button
            disabled={saving}
            className={`w-full py-3 text-lg font-semibold rounded-xl text-white
              bg-[#20c7ff] shadow-lg transition-all duration-200
              ${saving
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-sky-500 hover:scale-[1.02]"}`}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;