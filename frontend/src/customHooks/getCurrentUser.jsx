import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../config.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );

        dispatch(setUserData(result.data));
      } catch (error) {
        console.log("getCurrentUser error:", error);
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useCurrentUser;
