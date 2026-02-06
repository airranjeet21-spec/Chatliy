// import React, { useEffect } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import getCurrentUser from "./customHooks/getCurrentUser";
// import getOtherUsers from "./customHooks/getOtherUsers";
// import { useDispatch, useSelector } from "react-redux";
// import { setonlineUsers } from "./redux/userSlice";
// import { connectSocket, disconnectSocket } from "./socket";

// function App() {
//   getCurrentUser();
//   getOtherUsers();
//   const dispatch = useDispatch();
//   const { userData } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (!userData?._id) return;

//     const socket = connectSocket(userData._id);

//     socket.on("getOnlineUsers", (users) => {
//       dispatch(setonlineUsers(users));
//     });

//     return () => {
//       disconnectSocket();
//     };
//   }, [userData?._id, dispatch]);

//   return (
//     <Routes>
//   <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
//   <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
//   <Route 
//     path="/" 
//     element={
//       userData ? (
//         userData.name ? <Home /> : <Navigate to="/profile" />
//       ) : (
//         <Navigate to="/login" />
//       )
//     } 
//   />
//   <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/login" />} />
  
//   <Route path="*" element={<Navigate to={userData ? "/" : "/login"} />} />
// </Routes>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// Sahi naming se import karein
import useCurrentUser from "./customHooks/useCurrentUser";
import useOtherUsers from "./customHooks/useOtherUsers";
import { useDispatch, useSelector } from "react-redux";
import { setonlineUsers } from "./redux/userSlice";
import { connectSocket, disconnectSocket } from "./socket";

function App() {
  useCurrentUser();
  useOtherUsers();

  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData?._id) return;

    const socket = connectSocket(userData._id);
    socket.on("getOnlineUsers", (users) => {
      dispatch(setonlineUsers(users));
    });

    return () => {
      disconnectSocket();
    };
  }, [userData?._id, dispatch]);

  return (
    <Routes>
      <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route 
        path="/" 
        element={
          userData ? (
            userData.name ? <Home /> : <Navigate to="/profile" />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route path="/profile" element={userData ? <Profile /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={userData ? "/" : "/login"} />} />
    </Routes>
  );
}

export default App;
