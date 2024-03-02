import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import api from "../api/api";
import { login } from "../reducers/userSlice";

export default function HOC({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const Token = localStorage.getItem("token");

        setIsLoading(true);
        const user = await api
          .get("/auth/v1", {
            params: {
              token: Token,
            },
          })
          .then((res) => res.data);
        // console.log("user hoc nih", user);

        dispatch(login(user.user[0]));
        setIsLoading(false);
      } catch (err) {
        // console.log("err hoc", err);
        navigate("/login");
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [dispatch, currentPath]);

  if (isLoading) return <Spinner />;
  return children;
}
