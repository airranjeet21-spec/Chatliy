
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../config.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
function SignUp() {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading ,setLoading]=useState(false)
  let [err,setErr]=useState("")
  let dispatch=useDispatch()
  let {userData}=useSelector(state=>state.user)
  const handleSignUp = async (e) => {
  e.preventDefault();
  setLoading(true)
  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/signup`,
      { userName, email, password },
      { withCredentials: true }
    );
    dispatch(setUserData(result.data));
   setUserName("");
    setEmail("")
    navigate("/login")
        setPassword("")
        setLoading(false)
        setErr("")
  } catch (error) {
    console.log(error.response?.data || error.message);
    setLoading(false)
    setErr(error?.response?.data.message)
  }
};

return (
  <div className="w-full h-screen bg-gradient-to-br from-sky-100 to-blue-200 flex items-center justify-center">
    <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="h-[170px] bg-[#20c7ff] rounded-b-[35%] flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Create Account
        </h1>
      </div>
      <form
        onSubmit={handleSignUp}
        className="px-6 py-8 flex flex-col items-center gap-6"
      >
        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full h-[50px] px-5 text-lg text-gray-700
              border-2 border-[#20c7ff] rounded-xl
              outline-none focus:ring-2 focus:ring-[#20c7ff]
              shadow-sm"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full h-[50px] px-5 text-lg text-gray-700
              border-2 border-[#20c7ff] rounded-xl
              outline-none focus:ring-2 focus:ring-[#20c7ff]
              shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full h-[50px] relative">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            className="w-full h-full px-5 text-lg text-gray-700
              border-2 border-[#20c7ff] rounded-xl
              outline-none focus:ring-2 focus:ring-[#20c7ff]
              shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 right-4
              text-sm text-[#20c7ff] font-semibold cursor-pointer select-none"
            onClick={() => setShow((p) => !p)}
          >
            {show ? "Hide" : "Show"}
          </span>
        </div>
        {err && (
          <p className="text-red-600 text-sm font-medium text-center">
            {err}
          </p>
        )}
        <button
          disabled={loading}
          className={`w-full py-3 text-lg font-semibold rounded-xl text-white
            bg-[#20c7ff] shadow-lg transition-all duration-200
            ${loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-sky-500 hover:scale-[1.02]"}
          `}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
        <p className="text-gray-600 text-sm">
          Already have an account?
          <span
            className="text-[#20c7ff] font-semibold cursor-pointer ml-1"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  </div>
);
}
export default SignUp;