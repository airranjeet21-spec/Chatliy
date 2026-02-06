
// import { useEffect } from "react";
// import axios from "axios";
// import { serverUrl } from "../config.js";
// import { useDispatch, useSelector } from "react-redux";
// import { setotherUsers } from "../redux/userSlice";
// const getOtherUsers = () => {
//   let dispatch = useDispatch();
// let {userData}=useSelector(state=>state.user)
//   useEffect(() => {
//   if (!userData) return; 
//   const fetchUser = async () => {
//     try {
//       let result = await axios.get(`${serverUrl}/api/user/others`, { withCredentials: true });
//       dispatch(setotherUsers(result.data));
//     } catch (error) {
//       console.log("Other User error:", error);
//     }
//   };
//   fetchUser();
// }, [dispatch, userData?._id]);  
// };

// export default getOtherUsers;
import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../config.js";
import { useDispatch, useSelector } from "react-redux";
import { setotherUsers } from "../redux/userSlice";

const useOtherUsers = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return; 
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/others`, { withCredentials: true });
        dispatch(setotherUsers(result.data));
      } catch (error) {
        console.log("Other User error:", error);
      }
    };
    fetchUser();
  }, [dispatch, userData?._id]); 
};

export default useOtherUsers;
